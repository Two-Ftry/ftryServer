var express = require('express');
var router = express.Router();
var URL = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  //if(req.session.userInfo){
  //  console.log('userName:' + req.session.userInfo.userName + ', phone:' + req.session.userInfo.phone);
  //}
  //req.session["userInfo"] = {
  //  userName: 'jianfeng_huang',
  //  phone: '13528842913'
  //};
  if(!req.session || !req.session.userInfo){
    console.log('go to login!!!');
    res.redirect('/toLogin');
    return;
  }
  //console.log(qqqq.a);
  console.log('hhhh:' + req.session.userInfo.phone + ',' + req.session.userInfo.password);
  res.render('index', { title: 'Express' });
});

//登录
router.get('/login', function (req, res, next) {
  var params = URL.parse(req.url, true).query;
  if(!params.phone || !params.password){
    res.render('login', {title: 'login'});
  }else {
    //存入session
    req.session["userInfo"] = {
      phone: params.phone,
      password: params.password
    };
    res.redirect('/');
  }
});

router.get('/toLogin', function (req, res, next) {
  res.render('login', {title: 'login'});
});

module.exports = router;
