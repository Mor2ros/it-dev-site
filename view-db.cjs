const { dbService } = require('./database.cjs');

console.log('📊 Содержимое базы данных:\n');

// Показываем услуги
console.log('🔧 УСЛУГИ:');
const services = dbService.getServices();
if (services.length === 0) {
  console.log('  Нет услуг');
} else {
  services.forEach((service, index) => {
    console.log(`  ${index + 1}. ${service.title}`);
    console.log(`     Описание: ${service.description}`);
    console.log(`     Иконка: ${service.icon || 'не выбрана'}`);
    console.log(`     ID: ${service.id}`);
    console.log('');
  });
}

// Показываем отзывы
console.log('💬 ОТЗЫВЫ:');
const testimonials = dbService.getTestimonials();
if (testimonials.length === 0) {
  console.log('  Нет отзывов');
} else {
  testimonials.forEach((testimonial, index) => {
    console.log(`  ${index + 1}. ${testimonial.author} (${testimonial.company || 'без компании'})`);
    console.log(`     Отзыв: ${testimonial.quote.substring(0, 50)}...`);
    console.log(`     ID: ${testimonial.id}`);
    console.log('');
  });
}

// Показываем команду
console.log('👥 КОМАНДА:');
const team = dbService.getTeam();
if (team.length === 0) {
  console.log('  Нет членов команды');
} else {
  team.forEach((member, index) => {
    console.log(`  ${index + 1}. ${member.name} - ${member.role}`);
    console.log(`     ID: ${member.id}`);
    console.log('');
  });
}

// Показываем контакты
console.log('📞 КОНТАКТЫ:');
const contacts = dbService.getContacts();
if (contacts.length === 0) {
  console.log('  Нет контактов');
} else {
  contacts.forEach((contact, index) => {
    console.log(`  ${index + 1}. ${contact.name} (${contact.email})`);
    console.log(`     Сообщение: ${contact.message.substring(0, 50)}...`);
    console.log(`     ID: ${contact.id}`);
    console.log('');
  });
}

// Показываем статистику
const stats = dbService.getStats();
console.log('📈 СТАТИСТИКА:');
console.log(`  Услуг: ${stats.services_count}`);
console.log(`  Отзывов: ${stats.testimonials_count}`);
console.log(`  Членов команды: ${stats.team_count}`);
console.log(`  Контактов: ${stats.contacts_count}`); 