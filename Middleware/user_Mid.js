const md5 = require('md5');

async function CheckLogin(req, res, next) {
    const uname = (req.body.uname  !== undefined) ? addSlashes(req.body.uname     ) : "";
    const passwd = (req.body.passwd !== undefined) ?            req.body.passwd      : "";
    const enc_pass = md5("A"+passwd);
    const Query = `SELECT * FROM users WHERE uname = '${uname}' AND passwd = '${enc_pass}'`;


    const promisePool = db_pool.promise();


    //test
    //console.log("מנסה לבדוק שם וסיסמה:", uname, passwd);


    try {
        const [rows] = await promisePool.query(Query); // objects in arr and result from Query in index [0]

        console.log("תוצאה מהמסד:", rows);


        if (rows.length > 0){
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
