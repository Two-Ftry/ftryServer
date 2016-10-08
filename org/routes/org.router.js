/**
 * @desc
 * @require
 * @author jianfeng_huang.
 * @date 2016/9/23.
 */
var express = require('express');
var router = express.Router();

var OrgService = require('../business/org/service/OrgService');
var OrgEntity = require('../business/org/domain/OrgEntity');
var Util = require('../common/Util');

var orgService = new OrgService();

/**
 * 新建Org
 */
router.post('/save', function (req, res) {
    var entity = Util.getEntityInstance(req.body, new OrgEntity());
    orgService.save(entity).then(function (data) {
        res.send(data);
    }, function (err) {
        console.log('org router', err);
        res.send(err);
    });

});

/**
 * 根据Id获取Org信息
 */
router.post('/getOrgById', function (req, res) {
   var id = req.body.id;
    orgService.getOrgById(id).then(function (data) {
        res.send(data);
    }, function (err) {
        res.send(err);
    })
});

module.exports = router;