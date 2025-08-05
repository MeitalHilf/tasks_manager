function CheckLogin(req, res, next) {
    const uname = req.body.uname;
    const passwd = req.body.passwd;

    console.log("Username:", uname);
    console.log("Password:", passwd);

    next();
}

module.exports = { CheckLogin };

