/**
 * Created by Administrator on 2016/10/10 0010.
 */

var Bagpipe = require('bagpipe');
var fs = require('fs');

var bagpipe = new Bagpipe(10, {
    refuse: true,
    timeout: 3000
});

var aysnc = function(){
  fs.readFile('./file1.txt', 'utf-8', function () {
      console.log('read file done!!!');
  });
};

for(var i = 0; i < 100; i++){
    bagpipe.push(aysnc, function () {
        //coding
    });
}

bagpipe.on('full', function (length) {
    console.log('is full!!!');
});