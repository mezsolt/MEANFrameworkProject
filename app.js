var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var jsonparser = require('json-parser');
var favicon = require('serve-favicon');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sumRouter = require('./routes/sum');
var countryRouter = require('./routes/CountryQueryEndPoint');



var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

//app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sum', sumRouter);
app.use('/country', countryRouter);


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
  //res.render('error');
  res.send(err.message);
});

module.exports = app;

