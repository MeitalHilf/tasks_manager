// Middleware להוספת קטגוריה
async function AddCategory(req, res, next) {

    const name = req.body.name?.trim();

    const userId = req.user_id;
    if (!name) return res.status(400).send("יש להזין שם קטגוריה");
    if (!userId) return res.status(401).send("המשתמש לא מחובר");

    const Query = `INSERT INTO categories (name, user_id) VALUES (?, ?)`;
    const promisePool = db_pool.promise();

    try {
        await promisePool.query(Query, [name, userId]);
        res.redirect('/category'); // לאחר ההוספה חזרה לתפריט הקטגוריות
    } catch (err) {
        console.error("שגיאה בהוספת קטגוריה:", err);
        res.status(500).send("שגיאה בעת הוספת קטגוריה");
    }
}



async function EditCategory(req, res, next) {

    next();
}

async function ShowCategory(req, res, next) {
    const promisePool = db_pool.promise();
    try {
        const [rows] = await promisePool.query(
            "SELECT * FROM categories WHERE user_id = ?",
            [req.user_id]
        );
        req.categories = rows;
        next();
    } catch (err) {
        console.error("שגיאה בשליפת קטגוריות:", err);
        res.status(500).send("שגיאה בשליפת קטגוריות");
    }
}



async function DeleteCategory(req, res, next) {

    next();
}


module.exports = {
    AddCategory,
    EditCategory,
    ShowCategory,
    DeleteCategory
};