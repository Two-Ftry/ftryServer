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

app.use(favicon(__dirname + '/assests/img/bitbug_favicon.ico'));

//解析json数据 application/json
//app.use(bodyParser.json());

//解析 application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({extended: false}));
var bpurlencoded = bodyParser.urlencoded({extended: false});

app.get('/', bpurlencoded, function(req, res){
    console.log(req.body);
    res.send('hello serve favicon2!!!:' + req.body.a1 + '-' + req.body.a2);
});

app.post('/login', bpurlencoded, function(req, res){
    console.log('login post', req.body);
    //res.send('login2:' + req.body.a1 + '-' + req.body.a2);
    //res.setData({
    //    r1: 'r111'
    //});
});
app.get('/login', bpurlencoded, function(req, res){
    console.log('login get', req.body);
    //res.send('login2:' + req.body.a1 + '-' + req.body.a2);
    //res.setData({
    //    r1: 'r111'
    //});
});

module.exports = app;