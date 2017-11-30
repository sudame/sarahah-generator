var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  req.session.text = req.query.text;
  console.log('INDEX.JS REQ.USER = ' + req.user);
  if(req.user){
    console.log('KEYS : ' + Object.keys(req.user));
    console.log('REQ.USER.ID = ' + req.user.id);
  }

  if (req.usr && req.user.id) {
    res.render('index', {login: true, title: req.user.id });
  } else {
    res.render('index', {login: false, title: 'Express' });
  }
});

module.exports = router;
