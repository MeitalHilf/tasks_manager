const pool = require("../db");

async function CheckLogin(req, res, next) {
    const uname = req.body.uname;
    const passwd = req.body.passwd;

    //test
    console.log("מנסה לבדוק שם וסיסמה:", uname, passwd);

    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [uname]);

        console.log("תוצאה מהמסד:", rows);

        if (rows.length > 0 && rows[0].password === passwd) {
            req.validUser = true;
            req.user = rows[0]; // שומרים את כל הנתונים של המשתמש
        } else {
            req.validUser = false;
        }

        next();
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).send("שגיאה במסד הנתונים");
    }
}

module.exports = { CheckLogin };
