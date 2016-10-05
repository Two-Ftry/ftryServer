/**
 * Created by Administrator on 2016/10/5 0005.
 */

var async = require('async');
var fs = require('fs');

//异步的串行执行
async.series([
    function(callback){
        fs.readFile('../app.js', 'utf-8', callback);
    },
    function(callback){
        fs.readFile('../package.json', 'utf-8', callback);
    }
], function(err, results){
    console.log('results', results.length);
});

//异步的并行执行
async.parallel([
    function(callback){
        fs.readFile('../app.js', 'utf-8', callback);
    },
    function(callback){
        fs.readFile('../package.json', 'utf-8', callback);
    }],
    function(err, results){
        console.log('parallel results', results.length);
});

//异步调用的依赖处理
async.waterfall([
    function(callback){
        fs.readFile('./file1.txt', 'utf-8', function(err, content){
            callback(err, content);
        });
    },
    function(arg1, callback){
        console.log('file2.txt', arg1);
        fs.readFile('./file2.txt', 'utf-8', function(err, content){
            callback(err, content);
        });
    },
    function(arg1, callback){
        console.log('file3.txt', arg1);
        fs.readFile('./file3.txt', 'utf-8', function(err, content){
            callback(err, content);
        });
    }
], function(err, results){
    console.log('waterfall results', results);
});

//自动依赖处理 auth，使用json，配置好依赖，使用async.auth(deps);调用即可