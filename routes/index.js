var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('main.ejs');
});

router.get('/index', function(req, res, next) {
  res.render('index.ejs');
});

router.get('/requests/sent', function(req, res, next) {
  res.render('requests-sent.ejs');
});

router.get('/app-download', function(req, res, next) {
  res.render('app-download.ejs');
});

router.get('/estimates', function(req, res, next) {
  res.render('estimates.ejs');
});

router.get('/sign-up', function(req, res, next){
  res.render('sign-up.ejs')
})

router.get('/sign-up/user', function(req, res, next){
  res.render('user-signup.ejs')
})

module.exports = router;
