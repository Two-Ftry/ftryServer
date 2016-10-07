/**
 * Created by Administrator on 2016/10/6 0006.
 */

var Step = require('step');
var fs = require('fs');

//串行执行任务
Step(function readFile1(){
    fs.readFile('file1.txt', 'utf-8', this);
}, function (err, content) {
    console.log(content);
    fs.readFile('file2.txt', 'utf-8', this);
}, function (err, content) {
    console.log(content);
})

//并行任务执行
Step(function readFile1(){
    fs.readFile('file1.txt', 'utf-8', this.parallel());
    fs.readFile('file2.txt', 'utf-8', this.parallel());
}, function done(err, content1, content2){
    console.log(arguments);
});

//结果分组
Step(function readDir() {
    fs.readdir(__dirname, this);
},function readFiles(err, results){
    if(err){
        console.log('err', err);
        throw err;
    }
    var group = this.group();
    results.forEach(function (filename) {
        if(/\.txt$/.test(filename)){
            fs.readFile(__dirname + '/' + filename, 'utf-8', group());
        }
    })
},function showAll(err, files) {
        if(err){
            throw err;
        }
        console.dir(files);
 });