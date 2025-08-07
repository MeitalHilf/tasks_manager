
const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.urlencoded({extended: false}));


const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;

let db_M =require('./db');
global.db_pool = db_M.pool;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


global.addSlashes    = require('slashes').addSlashes;
global.stripSlashes  = require('slashes').stripSlashes;


app.use(express.static(path.join(__dirname, "public")));


app.use('/login', authRouter);
app.use('/admin', adminRouter);
app.use('/activity', activityRouter);



app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

