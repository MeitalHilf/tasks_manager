// Middleware להוספת קטגוריה
async function AddCategory(req, res, next) {

    const name = req.body.name?.trim();
    if (!name) {
        return res.status(400).send("יש להזין שם קטגוריה");
    }

    const Query = `INSERT INTO categories (name) VALUES (?)`;
    const promisePool = db_pool.promise();

    try {
        await promisePool.query(Query, [name]);
        res.redirect('/categories'); // לאחר ההוספה חזרה לתפריט הקטגוריות
    } catch (err) {
        console.error("שגיאה בהוספת קטגוריה:", err);
        res.status(500).send("שגיאה בעת הוספת קטגוריה");
    }
}



async function EditCategory(req, res, next) {

    next();
}

async function ShowCategory(req, res, next) {


    next();
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