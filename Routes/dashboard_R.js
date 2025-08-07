const express = require('express');
const router = express.Router();

// GET /admin
router.get('/', (req, res) => {
    res.render('admin_menu');
});

// דף הוספת משתמש
router.get('/add', (req, res) => {
    res.render('add_user');
});

module.exports = router;
