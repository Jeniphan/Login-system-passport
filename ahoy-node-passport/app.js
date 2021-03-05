var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const Localstrategy = require('passport-local').Strategy;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongod = require('./routes/db');
const mongodb = require('./routes/mongod');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

passport.use(
  new Localstrategy((username, password, cb) => {
    mongodb.findOne({ username }, (err, user) => {
      if (err){
        return cb(err);
      }
      if (!user){
        return cb(null, false);
      }

      if (bcrypt.compareSync(passwoed, user.password)){ 
        return cb(null, user);
      }
      return cb(null, false);
    });
  })
);

passport.deserializeUser((id, cb) => {
  mongodb.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(nell, user);
  });
});


app.use(passport.initialize());
app.use(passport.session());

module.exports = app;
