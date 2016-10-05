/**
 * Created by Administrator on 2016/10/2 0002.
 */

var Q = require('q');
var fs = require('fs');
var readFile = function(file, encoding){
    var deferred = Q.defer();
    fs.readFile(file, encoding, deferred.makeNodeResolver());
    return deferred.promise;
};
console.log(111);
readFile('../app.js', 'utf-8').then(function(data){
    console.log(222);
}, function (err) {
    console.log('222-1');
});
console.log(333);
