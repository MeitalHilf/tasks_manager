const express = require('express');
const router = express.Router();

// GET /admin
router.get('/', (req, res) => {
    res.render('admin_menu');
});

module.exports = router;
