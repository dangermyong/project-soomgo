const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next){
  res.render('signin.ejs')
})

router.get('/user', function(req, res, next){
  res.render('user-signin.ejs')
})

module.exports = router;
