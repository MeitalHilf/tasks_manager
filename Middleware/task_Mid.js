

async function AddTask(req, res, next) {
    const { title, description, due_date, category_id } = req.body;
    const is_done = req.body.is_done ? 1 : 0;
    const userId = req.user_id; // אותו רעיון כמו בקטגוריות

    if (!title || !due_date || !userId) {
        return res.status(400).send("חסרים נתונים");
    }

    const Query = `INSERT INTO tasks (title, description, due_date, category_id, is_done, user_id) 
                   VALUES (?, ?, ?, ?, ?, ?)`;
    const promisePool = db_pool.promise();

    try {
        await promisePool.query(Query, [title, description, due_date, category_id, is_done, userId]);
        res.redirect('/tasks'); // חזרה לתפריט המשימות
    } catch (err) {
        console.error("שגיאה בהוספת משימה:", err);
        res.status(500).send("שגיאה בעת הוספת משימה");
    }
}
function EditTask(req, res, next) {
    next();
    /* ... */ }
function ShowTasks(req, res, next) {
    next();
    /* ... */ }
function DeleteTask(req, res, next) {
    next();
    /* ... */ }

module.exports = {
    AddTask,
    EditTask,
    ShowTasks,
    DeleteTask
};
