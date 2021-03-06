/**
 * Created by Administrator on 2016/10/7 0007.
 */
var Q = require('q');

var DaoUtil = require('../../../common/DaoUtil');
var Util = require('../../../common/Util');

var OrgDao = function () {};
var _tableName = 'f_crm_org';
var OrgEntity = require('../domain/OrgEntity');

var OrgModel = null;

/**
 * 新建Org
 * @param org
 */
OrgDao.prototype.save = function(org){
    if(!org){
        return;
    }
    if(!OrgModel){
        var schema = new OrgEntity().getSchema();
        OrgModel = DaoUtil.getModel(schema, _tableName);
    }
    var entity = new OrgModel(org);
    entity.save();

    return entity;
};

/**
 * 根据Id更新Org信息
 * @param org
 */
OrgDao.prototype.updateOrgById = function(org){
    var deferred = Q.defer();

    if(!org || !org.id){
        Util.setTimeoutReject(deferred, {
            error: 'org id 不能为空'
        });
        return deferred.promise;
    }

    if(!OrgModel){
        var schema = new OrgEntity().getSchema();
        OrgModel = DaoUtil.getModel(schema, _tableName);
    }

    OrgModel.findByIdAndUpdate(org.id, org, deferred.makeNodeResolver());

    return deferred.promise;
};

/**
 * 根据Id删除Org
 * @param id
 */
OrgDao.prototype.deleteById = function (id) {
    var deferred = Q.defer();

    if(!id){
        Util.setTimeoutReject(deferred, {
            error: 'Id 不能为空'
        });
        return deferred.promise;
    }

    if(!OrgModel){
        var schema = new OrgEntity().getSchema();
        OrgModel = DaoUtil.getModel(schema, _tableName);
    }

    OrgModel.findByIdAndRemove(id, function (err, data) {
       if(err){
           deferred.reject(err);
       } else{
           deferred.resolve(data||{});
       }
    });

    return deferred.promise;

};

/**
 * 根据条件删除组织机构
 * @param id
 */
OrgDao.prototype.deleteByCondition = function (condition) {
    var deferred = Q.defer();

    if(!condition){
        Util.setTimeoutReject(deferred, {
            error: '条件不能为空'
        });
        return deferred.promise;
    }

    if(!OrgModel){
        var schema = new OrgEntity().getSchema();
        OrgModel = DaoUtil.getModel(schema, _tableName);
    }

    //OrgModel.findOneAndRemove(condition, function (err, data) {
    //    if(err){
    //        deferred.reject(err);
    //    } else{
    //        deferred.resolve(data||{});
    //    }
    //});

    // executed
    OrgModel.find().remove(condition, function (err, data) {
        if(err){
            deferred.reject(err);
        } else{
            deferred.resolve(data||{});
        }
    });

    return deferred.promise;

};

/**
 * 根据Id获取Org信息
 * @param id
 */
OrgDao.prototype.getOrgById = function(id){
  var deferred = Q.defer();

    if(!id){
        Util.setTimeoutReject(deferred, {
            error: 'Id 不能为空'
        });
      return deferred.promise;
    }

    if(!OrgModel){
        var schema = new OrgEntity().getSchema();
        OrgModel = DaoUtil.getModel(schema, _tableName);
    }

    OrgModel.findById(id, function (err, data) {
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(data);
        }
    });

    return deferred.promise;
};

/**
 * 根据tid（工作圈id）获取第一级组织机构的信息(每个tid只有一个top org)
 * @param tid
 */
OrgDao.prototype.getTopOrgByTid = function (tid) {
    var deferred = Q.defer();

    if(!tid){
        Util.setTimeoutReject(deferred, {
            error: 'tid 不能为空'
        });
        return deferred.promise;
    }

    if(!OrgModel){
        var schema = new OrgEntity().getSchema();
        OrgModel = DaoUtil.getModel(schema, _tableName);
    }

    OrgModel.find({tid: tid, isTop: true}, function (err, data) {
        console.log('dao :', err);
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(data);
        }
    });

    return deferred.promise;
};

/**
 * 根据tid（工作圈id）获取第一级组织机构的信息(每个tid只有一个top org)
 * @param tid
 */
OrgDao.prototype.getOrgsByCondition = function (condition) {
    var deferred = Q.defer();

    if(!condition){
        Util.setTimeoutReject(deferred, {
            error: '条件不能为空'
        });
        return deferred.promise;
    }

    if(!OrgModel){
        var schema = new OrgEntity().getSchema();
        OrgModel = DaoUtil.getModel(schema, _tableName);
    }

    if(condition.limit){//分页
        var _query = {};
        Object.assign(_query, condition);

        delete  _query.start;
        delete  _query.limit;
        OrgModel.find(_query, null, {skip: condition.start, limit: condition.limit}, function (err, data) {
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(data);
            }
        });
    }else{//不分页
        OrgModel.find(condition, function (err, data) {
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(data);
            }
        });
    }

    return deferred.promise;
};

module.exports = OrgDao;