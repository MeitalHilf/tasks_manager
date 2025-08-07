const express = require('express');
const router = express.Router();
const user_Mid = require('../middleware/user_Mid');

router.get('/', (req, res) => {
    // if (!req.user) {
    //     return res.redirect('/');
    // }

    res.render('dashboard', {
        user: req.user
    });
});

module.exports = router;