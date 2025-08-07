var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var authRouter = require('./Routes/auth_R');
var activityRouter = require('./Routes/tasks_R');
var adminRouter = require('./Routes/dashboard_R');


var index = express();

// view engine setup
index.set('views', path.join(__dirname, 'views'));
index.set('view engine', 'ejs');

index.use(logger('dev'));
index.use(express.json());
index.use(express.urlencoded({ extended: false }));
index.use(cookieParser());
index.use(express.static(path.join(__dirname, 'public')));



index.use('/login', authRouter);
index.use('/admin', adminRouter);
index.use('/activity', activityRouter);





const PORT = process.env.PORT || 3000;

index.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});

