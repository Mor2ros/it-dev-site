const Database = require('better-sqlite3');
const path = require('path');

// Создаем базу данных в папке data
const dbPath = path.join(__dirname, 'data', 'site.db');
const db = new Database(dbPath);

// Включаем внешние ключи
db.pragma('foreign_keys = ON');

// Создаем таблицы
function initDatabase() {
  // Таблица услуг
  db.exec(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      details TEXT,
      icon TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Таблица отзывов
  db.exec(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      author TEXT NOT NULL,
      company TEXT,
      quote TEXT NOT NULL,
      photo TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Таблица команды
  db.exec(`
    CREATE TABLE IF NOT EXISTS team (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      bio TEXT,
      photo TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Таблица контактов
  db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      message TEXT NOT NULL,
      ip TEXT,
      user_agent TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Database initialized successfully');
}

// Функция для создания подготовленных запросов
function createQueries() {
  return {
    // Services
    getAllServices: db.prepare('SELECT * FROM services ORDER BY created_at DESC'),
    getServiceById: db.prepare('SELECT * FROM services WHERE id = ?'),
    createService: db.prepare('INSERT INTO services (title, description, details, icon) VALUES (?, ?, ?, ?)'),
    updateService: db.prepare('UPDATE services SET title = ?, description = ?, details = ?, icon = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'),
    deleteService: db.prepare('DELETE FROM services WHERE id = ?'),
    
    // Testimonials
    getAllTestimonials: db.prepare('SELECT * FROM testimonials ORDER BY created_at DESC'),
    getTestimonialById: db.prepare('SELECT * FROM testimonials WHERE id = ?'),
    createTestimonial: db.prepare('INSERT INTO testimonials (author, company, quote, photo) VALUES (?, ?, ?, ?)'),
    updateTestimonial: db.prepare('UPDATE testimonials SET author = ?, company = ?, quote = ?, photo = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'),
    deleteTestimonial: db.prepare('DELETE FROM testimonials WHERE id = ?'),
    
    // Team
    getAllTeam: db.prepare('SELECT * FROM team ORDER BY created_at DESC'),
    getTeamMemberById: db.prepare('SELECT * FROM team WHERE id = ?'),
    createTeamMember: db.prepare('INSERT INTO team (name, role, bio, photo) VALUES (?, ?, ?, ?)'),
    updateTeamMember: db.prepare('UPDATE team SET name = ?, role = ?, bio = ?, photo = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'),
    deleteTeamMember: db.prepare('DELETE FROM team WHERE id = ?'),
    
    // Contacts
    getAllContacts: db.prepare('SELECT * FROM contacts ORDER BY created_at DESC'),
    getContactById: db.prepare('SELECT * FROM contacts WHERE id = ?'),
    createContact: db.prepare('INSERT INTO contacts (name, email, phone, company, message, ip, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?)'),
    deleteContact: db.prepare('DELETE FROM contacts WHERE id = ?'),
    
    // Статистика
    getStats: db.prepare(`
      SELECT 
        (SELECT COUNT(*) FROM services) as services_count,
        (SELECT COUNT(*) FROM testimonials) as testimonials_count,
        (SELECT COUNT(*) FROM team) as team_count,
        (SELECT COUNT(*) FROM contacts) as contacts_count
    `)
  };
}

// Функции для работы с данными
function createDbService() {
  const queries = createQueries();
  
  return {
    // Services
    getServices() {
      return queries.getAllServices.all();
    },
    
    getService(id) {
      return queries.getServiceById.get(id);
    },
    
    createService(data) {
      const result = queries.createService.run(data.title, data.description, data.details, data.icon || null);
      return { id: result.lastInsertRowid, ...data };
    },
    
    updateService(id, data) {
      const result = queries.updateService.run(data.title, data.description, data.details, data.icon || null, id);
      return result.changes > 0;
    },
    
    deleteService(id) {
      const result = queries.deleteService.run(id);
      return result.changes > 0;
    },
    
    // Testimonials
    getTestimonials() {
      return queries.getAllTestimonials.all();
    },
    
    getTestimonial(id) {
      return queries.getTestimonialById.get(id);
    },
    
    createTestimonial(data) {
      const result = queries.createTestimonial.run(data.author, data.company, data.quote, data.photo);
      return { id: result.lastInsertRowid, ...data };
    },
    
    updateTestimonial(id, data) {
      const result = queries.updateTestimonial.run(data.author, data.company, data.quote, data.photo, id);
      return result.changes > 0;
    },
    
    deleteTestimonial(id) {
      const result = queries.deleteTestimonial.run(id);
      return result.changes > 0;
    },
    
    // Team
    getTeam() {
      return queries.getAllTeam.all();
    },
    
    getTeamMember(id) {
      return queries.getTeamMemberById.get(id);
    },
    
    createTeamMember(data) {
      const result = queries.createTeamMember.run(data.name, data.role, data.bio, data.photo);
      return { id: result.lastInsertRowid, ...data };
    },
    
    updateTeamMember(id, data) {
      const result = queries.updateTeamMember.run(data.name, data.role, data.bio, data.photo, id);
      return result.changes > 0;
    },
    
    deleteTeamMember(id) {
      const result = queries.deleteTeamMember.run(id);
      return result.changes > 0;
    },
    
    // Contacts
    getContacts() {
      return queries.getAllContacts.all();
    },
    
    getContact(id) {
      return queries.getContactById.get(id);
    },
    
    createContact(data) {
      const result = queries.createContact.run(
        data.name, 
        data.email, 
        data.phone || null, 
        data.company || null, 
        data.message, 
        data.ip || null, 
        data.userAgent || null
      );
      return { id: result.lastInsertRowid, ...data };
    },
    
    deleteContact(id) {
      const result = queries.deleteContact.run(id);
      return result.changes > 0;
    },
    
    // Stats
    getStats() {
      return queries.getStats.get();
    }
  };
}

// Инициализируем базу данных
initDatabase();

// Создаем экземпляр сервиса после инициализации
const dbService = createDbService();

module.exports = { db, dbService }; 