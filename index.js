
const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.urlencoded({extended: false}));


const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;

let cookieParser = require('cookie-parser');
app.use(cookieParser());
global.jwt = require('jsonwebtoken');

let db_M =require('./db');
global.db_pool = db_M.pool;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


global.addSlashes    = require('slashes').addSlashes;
global.stripSlashes  = require('slashes').stripSlashes;

// Routers && Pages
const authRoutes = require("./Routers/auth_R");
app.use("/", authRoutes);

const dashboardRoutes = require('./Routers/dashboard_R');
app.use('/dashboard', dashboardRoutes);

const tasksRoutes = require('./Routers/tasks_R');
app.use('/tasks', tasksRoutes);

const categoryRoutes = require('./Routers/categories_R');
app.use('/category', categoryRoutes);


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});





