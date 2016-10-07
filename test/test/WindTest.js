/**
 * Created by Administrator on 2016/10/7 0007.
 */

var Wind = require('wind');

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

var swapAsync = eval(Wind.compile("async", function(array, i, j){
    $await(Wind.Async.sleep(20));
    var t = array[i];
    array[i] = array[j];
    array[j] = t;
    //添加动画
    console.log('--动画--');
}));

var bubbleSort = eval(Wind.compile("async", function (array) {
    for(var i = 0, len = array.length; i < len; i++){
        for(var j = 0; j < array.length - i - 1; j++){
            if(compare(array[j], array[j+1]) > 0){
                console.log('--排序一次--');
                $await(swapAsync(array, j, j+1));
            }
        }
    }
}));


var arr = [6, 5, 99, 46, 6, 1, 32];
bubbleSort(arr);
console.log(arr);