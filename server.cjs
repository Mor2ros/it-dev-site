const express = require('express');
const cors = require('cors');
const { dbService } = require('./database.cjs');

const app = express();
app.use(cors());
app.use(express.json());

// Получить все данные
app.get('/api/:type', (req, res) => {
  const { type } = req.params;
  
  try {
    let data;
    switch (type) {
      case 'services':
        data = dbService.getServices();
        break;
      case 'testimonials':
        data = dbService.getTestimonials();
        break;
      case 'team':
        data = dbService.getTeam();
        break;
      case 'contacts':
        data = dbService.getContacts();
        break;
      case 'stats':
        data = dbService.getStats();
        break;
      default:
        return res.status(404).json({ error: 'Not found' });
    }
    
    res.json(data);
  } catch (error) {
    console.error(`Error getting ${type}:`, error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Получить конкретную запись
app.get('/api/:type/:id', (req, res) => {
  const { type, id } = req.params;
  
  try {
    let data;
    switch (type) {
      case 'services':
        data = dbService.getService(parseInt(id));
        break;
      case 'testimonials':
        data = dbService.getTestimonial(parseInt(id));
        break;
      case 'team':
        data = dbService.getTeamMember(parseInt(id));
        break;
      case 'contacts':
        data = dbService.getContact(parseInt(id));
        break;
      default:
        return res.status(404).json({ error: 'Not found' });
    }
    
    if (!data) {
      return res.status(404).json({ error: 'Record not found' });
    }
    
    res.json(data);
  } catch (error) {
    console.error(`Error getting ${type} ${id}:`, error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Создать новую запись
app.post('/api/:type', (req, res) => {
  const { type } = req.params;
  
  try {
    let result;
    switch (type) {
      case 'services':
        result = dbService.createService(req.body);
        break;
      case 'testimonials':
        result = dbService.createTestimonial(req.body);
        break;
      case 'team':
        result = dbService.createTeamMember(req.body);
        break;
      case 'contacts':
        result = dbService.createContact(req.body);
        break;
      default:
        return res.status(404).json({ error: 'Not found' });
    }
    
    res.status(201).json(result);
  } catch (error) {
    console.error(`Error creating ${type}:`, error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Обновить запись
app.put('/api/:type/:id', (req, res) => {
  const { type, id } = req.params;
  
  try {
    let success;
    switch (type) {
      case 'services':
        success = dbService.updateService(parseInt(id), req.body);
        break;
      case 'testimonials':
        success = dbService.updateTestimonial(parseInt(id), req.body);
        break;
      case 'team':
        success = dbService.updateTeamMember(parseInt(id), req.body);
        break;
      default:
        return res.status(404).json({ error: 'Not found' });
    }
    
    if (!success) {
      return res.status(404).json({ error: 'Record not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error(`Error updating ${type} ${id}:`, error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Удалить запись
app.delete('/api/:type/:id', (req, res) => {
  const { type, id } = req.params;
  
  try {
    let success;
    switch (type) {
      case 'services':
        success = dbService.deleteService(parseInt(id));
        break;
      case 'testimonials':
        success = dbService.deleteTestimonial(parseInt(id));
        break;
      case 'team':
        success = dbService.deleteTeamMember(parseInt(id));
        break;
      case 'contacts':
        success = dbService.deleteContact(parseInt(id));
        break;
      default:
        return res.status(404).json({ error: 'Not found' });
    }
    
    if (!success) {
      return res.status(404).json({ error: 'Record not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error(`Error deleting ${type} ${id}:`, error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Массовое обновление (для совместимости с админ-панелью)
app.put('/api/:type', (req, res) => {
  const { type } = req.params;
  
  try {
    // Для массового обновления нужно очистить таблицу и вставить новые данные
    // Это упрощенная версия - в реальном проекте лучше использовать транзакции
    const items = req.body;
    
    switch (type) {
      case 'services':
        // Очищаем и пересоздаем
        dbService.getServices().forEach(service => {
          dbService.deleteService(service.id);
        });
        items.forEach(item => {
          dbService.createService(item);
        });
        break;
      case 'testimonials':
        dbService.getTestimonials().forEach(testimonial => {
          dbService.deleteTestimonial(testimonial.id);
        });
        items.forEach(item => {
          dbService.createTestimonial(item);
        });
        break;
      case 'team':
        dbService.getTeam().forEach(member => {
          dbService.deleteTeamMember(member.id);
        });
        items.forEach(item => {
          dbService.createTeamMember(item);
        });
        break;
      case 'contacts':
        dbService.getContacts().forEach(contact => {
          dbService.deleteContact(contact.id);
        });
        items.forEach(item => {
          dbService.createContact(item);
        });
        break;
      default:
        return res.status(404).json({ error: 'Not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error(`Error bulk updating ${type}:`, error);
    res.status(500).json({ error: 'Database error' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend API listening on port ${PORT}`);
  console.log(`Database: SQLite`);
  console.log(`Available on network: http://0.0.0.0:${PORT}`);
}); 