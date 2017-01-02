/**
 * Created by Administrator on 2016/10/7 0007.
 */

var Wind = require('wind');
var fs = require('fs');

var compare = function(x, y){
    return x - y;
};

//var swap = function(array, i, j){
//  var t = array[i];
//    array[i] = array[j];
//    array[j] = t;
//    //添加动画
//    setTimeout(function(){
//        console.log('--动画--');
//    }, 20);
//};
//
//var swapAsync = eval(Wind.compile("async", function(array, i, j){
//    $await(Wind.Async.sleep(20));
//    var t = array[i];
//    array[i] = array[j];
//    array[j] = t;
//    //添加动画
//    console.log('--动画--');
//}));
//
//var bubbleSort = eval(Wind.compile("async", function (array) {
//    for(var i = 0, len = array.length; i < len; i++){
//        for(var j = 0; j < array.length - i - 1; j++){
//            if(compare(array[j], array[j+1]) > 0){
//                console.log('--排序一次--');
//                $await(swapAsync(array, j, j+1));
//            }
//        }
//    }
//}));
//
//
//var arr = [6, 5, 99, 46, 6, 1, 32];
//bubbleSort(arr);
//console.log(arr);

//==================================================================
var readFileAsync = function(filename, encoding){
      return    Wind.Async.Task.create(function (t) {
      fs.readFile(filename, encoding, function (err, data) {
         if(err){
             t.complete('failure', err);
         } else{
             t.complete('success', data);
         }
      });
  });
};

console.log('async start-----------------------');
var task = readFileAsync('./file1.txt', 'utf-8');
console.log(task);
console.log('async end-----------------------');

//var series = eval(Wind.compile("async", function () {
//    var file1 = $await(readFileAsync('./file1.txt', 'utf-8'));
//    console.log(file1);
//    var file2 = $await(readFileAsync('./file2.txt', 'utf-8'));
//    console.log(file2);
//    var file3 = $await(readFileAsync('./file3.txt', 'utf-8'));
//    console.log(file3);
//}));
//
//series().start();
////
//
////Wind异步并发处理
//var parallel = eval(Wind.compile("async", function(){
//    var result = $await(Wind.Async.Task.whenAll({
//        file1: readFileAsync('./file1.txt', 'utf-8'),
//        file2: readFileAsync('./file2.txt', 'utf-8')
//    }));
//    console.log(result.file1);
//    console.log(result.file2);
//}));
//console.log('Wind out 并发处理 ----------------------------------------------');
//parallel().start();