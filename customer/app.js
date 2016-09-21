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
var logger = require('morgan');
var fs = require('fs');
var FileStreamRotator = require('file-stream-rotator');

app.use(favicon(__dirname + '/assests/img/bitbug_favicon.ico'));

//解析json数据 application/json
app.use(bodyParser.json());

//解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());

//记日志
//app.use(logger('dev'));//:method :url :status :response-item ms - :res[conent-length]
var logDirectory = __dirname + '/log';
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: logDirectory + '/access-%DATE%.log',
    frequency: 'daily',
    verbose: false
});
app.use(logger('combined', {stream: accessLogStream}));

app.post('/', function(req, res){
    console.log(req.body);
    res.end('hello serve favicon2!!!:' + req.body.a1 + '-' + req.body.a2);
});

app.post('/login', function(req, res){
    console.log('login post', req.body);
    res.sendData({a: 'fy'});
    res.end('login post ok');
});
app.get('/login', function(req, res){
    var url = URL.parse(req.url, true);
    console.log('login get', url.query, url.hash);
    res.end('login get ok hhh');
});

module.exports = app;