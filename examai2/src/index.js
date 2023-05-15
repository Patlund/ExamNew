const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '5065.Tess!',
  database: 'ExamAI',
  port: 3306,
  connectionLimit: 10,
});

app.get('/', (req, res) => {
  res.send('Hello, Express and MySQL2!');
});

app.post('/items', (req, res) => {
  const itemId = Math.floor(Math.random() * 1000000000);
  const { name, country, hobby } = req.body;

  pool.query(
    'INSERT INTO items (itemId, name, country, hobby) VALUES (?, ?, ?, ?)',
    [itemId, name, country, hobby],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Error inserting item' });
      } else {
        res.status(201).json({ message: 'Item added successfully', itemId });
      }
    }
  );
});

app.put('/items/:itemId', (req, res) => {
  const { itemId } = req.params;
  const { name, country, hobby } = req.body;

  pool.query(
    'UPDATE items SET name = ?, country = ?, hobby = ? WHERE itemId = ?',
    [name, country, hobby, itemId],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating item' });
      } else {
        res.status(200).json({ message: 'Item updated successfully' });
      }
    }
  );
});

app.delete('/items/:itemId', (req, res) => {
  const { itemId } = req.params;

  pool.query('DELETE FROM items WHERE itemId = ?', [itemId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting item' });
    } else {
      res.status(200).json({ message: 'Item deleted successfully' });
    }
  });
});

app.get('/items', (req, res) => {
  pool.query('SELECT * FROM items', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching items' });
    } else {
      res.status(200).json(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});