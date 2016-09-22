/**
 * @desc 客户路由表
 * @require
 * @author jianfeng_huang.
 * @date 2016/9/22.
 */

var express = require('express');
var router = express.Router();

router.post('/add', function (req, res) {
    console.log('customer-add');
    res.end('customer add');
});

module.exports = router;