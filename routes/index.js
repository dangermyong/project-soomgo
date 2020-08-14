const express = require('express');
const router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index.ejs');
});

router.get('/app-download', function(req, res, next) {
  res.render('app-download.ejs');
});

router.get('/estimates', function(req, res, next) {
  res.render('estimates.ejs');
});

module.exports = router;
