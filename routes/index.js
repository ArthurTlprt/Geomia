var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.get('/particules', function(req, res, next) {
  res.render('particules', {});
});

router.get('/solar', function(req, res, next) {
  res.render('solar', {});
});

module.exports = router;
