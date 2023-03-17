import express from 'express';
import pool from './index.js';

const router = express.Router();

router.post('/api/addItem', async (req, res) => {
    try {
        const db = await pool.getConnection();
        const item = req.body;
        const registerSql = `INSERT INTO personalInfo (itemId, name, country, hobby) VALUES (?, ?, ?, ?)`;
        const preparedStatement = await db.prepare(registerSql);
        await preparedStatement.execute([item.itemId, item.name, item.country, item.hobby]);
        res.json(item);
        db.release();
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.get('/api/getAllItems', async (req, res) => {
    const db = await pool.getConnection();
    const preparedStatement = await db.prepare('SELECT * FROM personalInfo')
    const result = await preparedStatement.execute();
    res.json(result[0]);
    db.release();
})


export default router;