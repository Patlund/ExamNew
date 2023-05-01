import express from 'express';
import mysql from 'mysql2';

const app = express();
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '5065.Tess!',
  database: 'ExamAI',
  connectionLimit: 10,
});

// Add item to database
app.post('/items', (req, res) => {
  const { name, country, hobby } = req.body;
  const itemId = Math.floor(Math.random() * 1000000000) + 1;
  const sql = 'INSERT INTO items (itemId, name, country, hobby) VALUES (?, ?, ?, ?)';
  const values = [itemId, name, country, hobby];
  
  pool.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.json({ success: true });
  });
});

// Delete item from database by itemId
app.delete('/items/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  const sql = 'DELETE FROM items WHERE itemId = ?';

  pool.query(sql, [itemId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.json({ success: true });
  });
});

// Update item in database by itemId
app.put('/items/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  const { name, country, hobby } = req.body;
  const sql = 'UPDATE items SET name = ?, country = ?, hobby = ? WHERE itemId = ?';
  const values = [name, country, hobby, itemId];

  pool.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.json({ success: true });
  });
});

// Get all items from database
app.get('/items', (req, res) => {
  const sql = 'SELECT * FROM items';

  pool.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});