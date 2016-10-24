var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var _dbsetting = require('./config/settings');
var app = express();

//MongoDB session
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
//redis session
//const RedisStore = require('connect-redis')(session);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'assests/img', 'bitbug_favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use(session({
//  secret: 'jfhuang',
//  cookie: {
//    maxAge: 1000*60*60*24*30
//  },
//  resave: false,
//  saveUninitialized: true,
//  store: new RedisStore({
//    //ttl: 7*24*60*60,
//    host: '127.0.0.1',
//    port: '6379',
//    db: 0,
//    pass: '123456'
//  })
//}));
app.use(session({
  secret: 'jianfeng_huang',
  key: _dbsetting.db,
  cookie: {
    maxAge: 1000*60*60*24*30
  },
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    //db: _dbsetting.db,
    //host: _dbsetting.host,
    //port: _dbsetting.port
    url: 'mongodb://jianfeng_huang_test:ftry900127@119.29.82.54/test?authSource=test'
  })
}));

//
app.use(function (req, res, next) {
  console.log('路由钱拦截请求，可以做AOP...');
  next();
});

app.use('/', routes);
app.use('/users', users);

app.use(function (req, res, next) {
  console.log('应用级中间件test unlogin');
  if(!req.session){
    console.log('unlogin');
    return next(new Error('unlogin'));
  }
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('应用级中间件test 404');
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log('应用级中间件test 500 dev');
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log('应用级中间件test 500');
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
