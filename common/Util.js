/**
 * Created by Administrator on 2016/10/5 0005.
 */
var Result = require('./domain/Result');
var ConstUtil = require('./ConstUtil');

var Util = function(){};

//获取entity实例
Util.getEntityInstance = function(reqBody, entity, isWithId){
    if(!reqBody){
        return entity;
    }
    var _schema = entity.getSchema();
    for(var key in _schema){
        if(key == 'id' && !isWithId){
            continue;
        }
        var val = reqBody[key];
        if(val){
            //根据类型转化
            if(_schema[key].type.toString().indexOf('Number') > 0){
                val = parseFloat(val);
            }
            entity[key] = val ? val : '';
        }
    }
    return entity;
};

//获取entity实例
Util.getQueryInstance = function(reqBody){
    if(!reqBody){
        return null;
    }
    var query = {};
    query.start = reqBody['start'];
    query.limit = reqBody['limit'];
    query.keyword = reqBody['keyword'];
    return query;
};

/**
 * 对于进行异步封装的方法中，在立即返回时，需要有一个延迟，使用该方法
 * @param deferred
 * @param result
 * @param delay  默认20毫秒
 */
Util.setTimeoutReject = function (deferred, result, delay) {
  setTimeout(function () {
      deferred.reject(result);
  }, delay || 20)
};

/**
 * 异步回调的返回的封装
 * @param deferred
 * @param code
 * @param data
 * @param msg
 */
Util.resolveWithResult = function (deferred, code, data, msg) {
    deferred.resolve(new Result({
        code: code,
        data: data,
        msg: msg || ''
    }));
};

/**
 * 异步回调的返回的封装
 * @param deferred
 * @param code
 * @param err
 * @param msg
 */
Util.rejectWithResult = function (deferred, code, err, msg) {
    deferred.reject(new Result({
        code: code,
        error: err,
        msg: msg
    }));
};

/**
 * 处理分页的工具
 * @param query
 * @param isPaging
 * @returns {*}
 */
Util.pageCtrl = function (query, isPaging) {
    if(isPaging == undefined){
        isPaging = true;
    }
    if(!query){
        query = {};
    }
    if(isPaging){
        if(query.start == undefined || isNaN(query.start)){
            query.start = ConstUtil.__PAGE_START__;
        }
        if(query.limit == undefined || isNaN(query.limit)){
            query.limit = ConstUtil.__PAGE_LIMIT__;
        }
        //如果start 、limit不是數字
        query.start = parseInt(query.start);
        query.limit = parseInt(query.limit);
    }else{
        delete query.start;
        delete query.limit;
    }



    return query;
};

module.exports = Util;