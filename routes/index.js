var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  req.session.text = req.query.text;
  console.log('INDEX.JS REQ.USER = ' + req.user);
  if(req.user) console.log(Object.keys(req.user));
  if (req.user.id) {
    res.render('index', {login: true, title: req.user.profile.id });
  } else {
    res.render('index', {login: false, title: 'Express' });
  }
});

module.exports = router;
