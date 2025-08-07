
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var authRouter = require('./Routes/auth_R');
var activityRouter = require('./Routes/tasks_R');
var adminRouter = require('./Routes/dashboard_R');


const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));



index.use('/login', authRouter);
index.use('/admin', adminRouter);
index.use('/activity', activityRouter);





const PORT = process.env.PORT || 3000;

index.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});

