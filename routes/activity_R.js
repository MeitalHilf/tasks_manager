const express = require('express');
const router = express.Router();
const db = require('../db');

// בדיקה פשוטה שהראוטר עובד
router.get('/list', async (req, res) => {
    try {
        const [tasks] = await db.query('SELECT * FROM tasks');
        res.render('activity_list', { tasks });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving tasks');
    }
});

module.exports = router;
