var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Hello World');
});

router.get('/another', function(req, res, next) {
    res.send('Hello World hahaha');
  });

module.exports = router;