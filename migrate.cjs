const fs = require('fs');
const path = require('path');
const { dbService } = require('./database.cjs');

// Функция для чтения JSON файла
function readJsonFile(filename) {
  try {
    const filePath = path.join(__dirname, 'data', filename);
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error(`Error reading ${filename}:`, error.message);
    return [];
  }
}

// Функция для миграции услуг
function migrateServices() {
  console.log('Migrating services...');
  const services = readJsonFile('services.json');
  
  // Массив иконок для автоматического назначения
  const defaultIcons = ['Code', 'Cloud', 'Smartphone', 'Laptop', 'Settings', 'Rocket'];
  
  services.forEach((service, index) => {
    try {
      // Проверяем, существует ли уже такая услуга
      const existing = dbService.getServices().find(s => s.title === service.title);
      if (!existing) {
        const details = service.details ? JSON.stringify(service.details) : null;
        const icon = service.icon || defaultIcons[index % defaultIcons.length];
        dbService.createService({
          title: service.title,
          description: service.description,
          details: details,
          icon: icon
        });
        console.log(`✓ Migrated service: ${service.title} (icon: ${icon})`);
      } else {
        console.log(`- Service already exists: ${service.title}`);
      }
    } catch (error) {
      console.error(`✗ Error migrating service ${service.title}:`, error.message);
    }
  });
}

// Функция для миграции отзывов
function migrateTestimonials() {
  console.log('Migrating testimonials...');
  const testimonials = readJsonFile('testimonials.json');
  
  testimonials.forEach(testimonial => {
    try {
      // Проверяем, существует ли уже такой отзыв
      const existing = dbService.getTestimonials().find(t => 
        t.author === testimonial.author && t.quote === testimonial.quote
      );
      if (!existing) {
        dbService.createTestimonial({
          author: testimonial.author,
          company: testimonial.company,
          quote: testimonial.quote,
          photo: testimonial.photo
        });
        console.log(`✓ Migrated testimonial from: ${testimonial.author}`);
      } else {
        console.log(`- Testimonial already exists from: ${testimonial.author}`);
      }
    } catch (error) {
      console.error(`✗ Error migrating testimonial from ${testimonial.author}:`, error.message);
    }
  });
}

// Функция для миграции команды
function migrateTeam() {
  console.log('Migrating team...');
  const team = readJsonFile('team.json');
  
  team.forEach(member => {
    try {
      // Проверяем, существует ли уже такой член команды
      const existing = dbService.getTeam().find(t => 
        t.name === member.name && t.role === member.role
      );
      if (!existing) {
        dbService.createTeamMember({
          name: member.name,
          role: member.role,
          bio: member.bio,
          photo: member.photo
        });
        console.log(`✓ Migrated team member: ${member.name}`);
      } else {
        console.log(`- Team member already exists: ${member.name}`);
      }
    } catch (error) {
      console.error(`✗ Error migrating team member ${member.name}:`, error.message);
    }
  });
}

// Функция для миграции контактов
function migrateContacts() {
  console.log('Migrating contacts...');
  const contacts = readJsonFile('contacts.json');
  
  contacts.forEach(contact => {
    try {
      // Проверяем, существует ли уже такой контакт
      const existing = dbService.getContacts().find(c => 
        c.email === contact.email && c.message === contact.message
      );
      if (!existing) {
        dbService.createContact({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          company: contact.company,
          message: contact.message,
          ip: contact.ip,
          userAgent: contact.userAgent
        });
        console.log(`✓ Migrated contact from: ${contact.name}`);
      } else {
        console.log(`- Contact already exists from: ${contact.name}`);
      }
    } catch (error) {
      console.error(`✗ Error migrating contact from ${contact.name}:`, error.message);
    }
  });
}

// Основная функция миграции
function migrateAll() {
  console.log('🚀 Starting data migration from JSON to SQLite...\n');
  
  try {
    migrateServices();
    console.log('');
    
    migrateTestimonials();
    console.log('');
    
    migrateTeam();
    console.log('');
    
    migrateContacts();
    console.log('');
    
    // Показываем статистику
    const stats = dbService.getStats();
    console.log('📊 Migration completed! Database statistics:');
    console.log(`  Services: ${stats.services_count}`);
    console.log(`  Testimonials: ${stats.testimonials_count}`);
    console.log(`  Team members: ${stats.team_count}`);
    console.log(`  Contacts: ${stats.contacts_count}`);
    
    console.log('\n✅ Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
  }
}

// Запускаем миграцию, если скрипт вызван напрямую
if (require.main === module) {
  migrateAll();
}

module.exports = { migrateAll }; 