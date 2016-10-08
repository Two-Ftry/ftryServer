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
//readFile('./file1.txt', 'utf-8').then(function(data){
//    console.log(data);
//}, function (err) {
//    console.log(err);
//});
Q.all([readFile('./file1.txt', 'utf-8'), readFile('./file2.txt', 'utf-8')]).then(function (values) {
    console.log(values);
}, function (err) {
    console.log(err);
});
console.log(333);
