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
    const preparedStatement = await db.prepare('SELECT * FROM personalInfo');
    const result = await preparedStatement.execute();
    res.json(result[0]);
    db.release();
})

router.delete('/api/deleteItem', async (req, res) => {
    const db = await pool.getConnection();
    const itemId = req.body.itemId;
    const preparedStatement = await db.prepare('DELETE FROM personalInfo WHERE itemId = ?');
    await preparedStatement.execute([itemId]);
    res.json({ success: true })
    db.release();
})

router.put('/api/updateItem', async (req,res) => {
    const db = await pool.getConnection();
    const item = req.body;
    const preparedStatement = await db.prepare('UPDATE personalInfo SET name = ? ,country = ?,hobby = ? WHERE itemId = ?');
    await preparedStatement.execute([item.name,item.country,item.hobby,item.itemId]);
    res.json({success: true})
    db.release();
})


export default router;