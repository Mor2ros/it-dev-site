const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
const files = {
  services: 'services.json',
  testimonials: 'testimonials.json',
  team: 'team.json',
};

function getFilePath(type) {
  return path.join(DATA_DIR, files[type]);
}

// Получить все данные
app.get('/api/:type', (req, res) => {
  const { type } = req.params;
  if (!files[type]) return res.status(404).json({ error: 'Not found' });
  fs.readFile(getFilePath(type), 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Read error' });
    res.json(JSON.parse(data));
  });
});

// Сохранить все данные (заменить файл)
app.put('/api/:type', (req, res) => {
  const { type } = req.params;
  if (!files[type]) return res.status(404).json({ error: 'Not found' });
  fs.writeFile(getFilePath(type), JSON.stringify(req.body, null, 2), 'utf8', err => {
    if (err) return res.status(500).json({ error: 'Write error' });
    res.json({ success: true });
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend API listening on port ${PORT}`);
}); 