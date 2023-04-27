const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '5065.Tess!',
  database: 'ExamAI',
  connectionLimit: 10
});

app.use(express.json());

app.post('/items', async (req, res) => {
  try {
    const itemId = Math.floor(Math.random() * 1000000000) + 1;
    const { name, country, hobby } = req.body;
    const query = 'INSERT INTO items (itemId, name, country, hobby) VALUES (?, ?, ?, ?)';
    const values = [itemId, name, country, hobby];
    const result = await pool.query(query, values);
    res.status(201).json({ success: true, message: 'Item added successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

app.delete('/items/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const query = 'DELETE FROM items WHERE itemId = ?';
    const result = await pool.query(query, [itemId]);
    res.status(200).json({ success: true, message: 'Item deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

app.put('/items/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const { name, country, hobby } = req.body;
    const query = 'UPDATE items SET name = ?, country = ?, hobby = ? WHERE itemId = ?';
    const values = [name, country, hobby, itemId];
    const result = await pool.query(query, values);
    res.status(200).json({ success: true, message: 'Item updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

app.get('/items', async (req, res) => {
  try {
    const query = 'SELECT * FROM items';
    const [rows] = await pool.query(query);
    res.status(200).json({ success: true, items: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000.');
});