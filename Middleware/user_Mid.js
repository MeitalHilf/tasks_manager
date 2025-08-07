const md5 = require('md5');

const pool = require("../db");

async function CheckLogin(req, res, next) {

    console.log("BODY:", req.body);
    const uname = req.body.uname;
    const passwd = req.body.passwd;

    //test
    console.log("מנסה לבדוק שם וסיסמה:", uname, passwd);

    const enc_pass = md5("A" + passwd);
    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [uname]);

        console.log("תוצאה מהמסד:", rows);


        if (rows.length > 0 && rows[0].password === enc_pass){
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
