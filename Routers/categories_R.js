const express = require('express');
const router = express.Router();
const { AddCategory, EditCategory,ShowCategory, DeleteCategory } = require('../Middleware/category_Mid');


// main for category pages
router.get('/', (req, res) => {
    // if (!req.user) return res.redirect('/');

    res.render('categories_menu', {
        user: req.user
    });
});



//  GET add category pages
router.get('/add', (req, res) => {
    // if (!req.user) return res.redirect('/');
    res.render('categories_add', {
        user: req.user
    });
});


router.post('/add', AddCategory, (req, res) => {
//שימוש בהמשך
});




//  GET Edit category pages
router.get('/edit', (req, res) => {
    // if (!req.user) return res.redirect('/');
    res.render('categories_edit', {
        user: req.user
    });
});


router.post('/edit', EditCategory, (req, res) => {

});

router.get('/list', ShowCategory, (req, res) => {
    res.render('categories_list', {
        user: req.user,
        categories: req.categories // <-- חשוב! זה השם שהתבנית מצפה לו
    });
});



router.get('/delete', (req, res) => {
    // if (!req.user) return res.redirect('/');
    res.render('categories_delete');
});

router.post('/delete', DeleteCategory, (req, res) => {

});

module.exports = router;