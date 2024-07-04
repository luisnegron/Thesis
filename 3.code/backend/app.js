var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const connectDB = require('./config/database');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const studentsRouter = require('./routes/students');
const teachersRouter = require('./routes/teachers');
const subjectsRouter = require('./routes/subjects');


var app = express();

// Habilitar CORS
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

connectDB();

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/students', studentsRouter);
app.use('/teachers', teachersRouter);
app.use('/subjects', subjectsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
