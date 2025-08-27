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
    const id = parseInt(req.body.id, 10);
    const newName = req.body.newName?.trim();
    const userId = req.user_id;

    if (!id || !newName) return res.status(400).send("חסר מזהה או שם חדש");
    if (!userId) return res.status(401).send("המשתמש לא מחובר");

    try {
        const query = "UPDATE categories SET name=? WHERE id=? AND user_id=?";
        const promisePool = db_pool.promise();

        const [result] = await promisePool.query(query, [newName, id, userId]);


        if (result.affectedRows === 0) {
            return res.status(404).send("לא נמצאה קטגוריה שלך עם המזהה הזה");
        }

        return res.redirect("/category/list");
    } catch (err) {
        console.error("שגיאה בעדכון קטגוריה:", err);
        return res.status(500).send("שגיאה בעדכון קטגוריה");
    }
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
    const id = parseInt(req.body.id, 10);
    const userId = req.user_id;

    if (!id) return res.status(400).send("חסר מזהה קטגוריה");
    if (!userId) return res.status(401).send("המשתמש לא מחובר");

    try {
        const query = "DELETE FROM categories WHERE id=? AND user_id=?";
        // המשך בשלב הבא
        next();
    } catch (err) {
        console.error("שגיאה במחיקת קטגוריה:", err);
        return res.status(500).send("शגיאה במחיקת קטגוריה");
    }
}


module.exports = {
    AddCategory,
    EditCategory,
    ShowCategory,
    DeleteCategory
};