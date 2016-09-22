/**
 * @desc 入口文件
 * @require
 * @author jianfeng_huang.
 * @date 2016/9/19.
 */
var express = require('express');
var app = express();

var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var URL = require('url');
var fs = require('fs');
var log4js = require('log4js');
var path = require('path');

app.use(favicon(__dirname + '/assests/img/bitbug_favicon.ico'));
//解析json数据 application/json
app.use(bodyParser.json());
//解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assests')));
//记日志
var logDirectory = __dirname + '/log';
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var logger = require('./config/log4js.js').logger;
app.use(log4js.connectLogger(logger, {level: 'auto', format:':method :url'}));

//router
var customerRouter = require('./routes/customerRouter');
app.use('/customer', customerRouter);

//404错误处理
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//500错误处理
app.use(function(err, req, res, next){
    logger.error('Something went wrong:', err);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;