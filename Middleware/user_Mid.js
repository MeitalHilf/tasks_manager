const md5 = require('md5');
const jwt = require('jsonwebtoken');

async function isLogged(req, res, next) {
    const jwtToken = req.cookies.ImLoggedToYoman;
    if (!jwtToken) {
        return res.redirect("/");
    }

    try {
        const decoded = jwt.verify(jwtToken, "myPrivateKey"); // בלי callback
        const data = decoded.data; // "id,name"
        const userId = parseInt(data.split(",")[0], 10);
        if (!userId) {
            return res.redirect("/");
        }
        req.user_id = userId;
        return next();
    } catch (err) {
        console.log("Token error:", err);
        return res.redirect("/");
    }
}

async function CheckLogin(req, res, next) {
    const uname = (req.body.uname  !== undefined) ? addSlashes(req.body.uname    ) : "";
    const passwd = (req.body.passwd !== undefined) ? req.body.passwd      : "";
    const Query = `SELECT * FROM users WHERE username = '${uname}' AND password = '${passwd}'`;


    const promisePool = db_pool.promise();

    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
    } catch (err) {
        console.log(err);
    }


    if(rows.length > 0){
        req.validUser = true;
        let val = `${rows[0].id},${rows[0].name}`;
        let token = jwt.sign(
            {data: val},
            'myPrivateKey',
            { expiresIn: 31*24*60*60 // in sec
            });
        res.cookie("ImLoggedToYoman", token, {
            maxAge: 31*24*60*60 * 1000, // 3hrs in ms
        });

    }else {
        req.validUser = false;
    }
    next();
}


module.exports = { CheckLogin, isLogged };

