var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  req.session.text = req.query.text;
  if (req.user && req.user.profile && req.user.profile.id) {
    res.render('index', {login: true, title: req.user.profile.id });
  } else {
    res.render('index', {login: false, title: 'Express' });
  }
});

module.exports = router;
