/**
 * Created by Administrator on 2016/10/2 0002.
 */
var failing = require('memeda').failing;
var fs = require('fs');

fs.readFile('../app.js', 'utf-8', failing(function(err){
    console.log('err');
}).passing(function (data) {
    console.log('data');
}));

console.log('222');