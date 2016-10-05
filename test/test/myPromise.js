/**
 * Created by Administrator on 2016/10/2 0002.
 */


var util = require('util');
var events = require('events');
var EventEmitter = events.EventEmitter;
var Promise = function(){
    EventEmitter.call(this);
};
util.inherits(Promise, EventEmitter);

Promise.prototype.then = function(successHandler, failHandler, progressHandler){

    if(typeof  successHandler == 'function'){
        this.once('done', successHandler);
    }

    if(typeof  failHandler == 'function'){
        this.once('fail', failHandler);
    }

    if(typeof progressHandler == 'function'){
        this.on('progress', progressHandler);
    }

    return this;
};

Promise.all = function (promises) {
    var promiseDeferred = new Deferred();
    var count = promises.length;
    //var me  = this;
    var results = [];
    promises.forEach(function(promise, i){
        promise.then(function(data){
            count --;
            results.push(data);
            if(count == 0){
                promiseDeferred.resolve(results);
            }
        }, function(err){
            promiseDeferred.reject(err);
        })
    });

    return promiseDeferred.promise;
};

var Deferred = function(){
    this.state = 'unfulfilled';
    this.promise = new Promise();
};

Deferred.prototype.resolve = function(obj){
    this.state = 'done';
    this.promise.emit('done', obj);
};

Deferred.prototype.reject = function(err){
    this.state = 'fail';
    this.promise.emit('fail', err);
};

Deferred.prototype.progress = function(data){
    this.promise.emit('progress', data);
};

//
//Deferred.prototype.all = function (promises) {
//    var count = promises.length;
//    var me  = this;
//    var results = [];
//    promises.forEach(function(promise, i){
//        promise.then(function(data){
//            count --;
//            results.push(data);
//            if(count == 0){
//                me.resolve(results);
//            }
//        }, function(err){
//            me.reject(err);
//        })
//    });
//
//    return this.promise;
//};

var fs = require('fs');

console.log('111');

//myReadFile().then(function(data){
//    console.log('333');
//}, function(err){
//    console.log('444');
//});
var promise1 = myReadFile('../app.js', 'utf-8');
var promise2 = myReadFile('../package.json', 'utf-8');
//var deferred = new Deferred();
//deferred.all([promise1, promise2]).then(function(results){
//    console.log('result.length:' + results.length);
//}, function(err){
//    console.log('err 111');
//});
Promise.all([promise1, promise2]).then(function(results){
    console.log('result.length22:' + results.length);
}, function(err){
    console.log('err 111');
});
function myReadFile(filename, encoding) {
  var deferred = new Deferred();
    encoding = encoding || 'utf-8';

    fs.readFile(filename, encoding, function(err, data){
        console.log('222');
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}