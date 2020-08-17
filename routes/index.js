const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const pool = require('../utils/mysql.js');
require('dotenv').config();

/* GET home page. */

router.get('/', async function(req, res, next) {
  try{
    const token = req.cookies.jwt;
    let payload
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if ( token == null ) {
        return res.render('index.ejs');
      }
      return res.render('index.ejs');
    } 
    const userId = payload.id;
    const connection = await pool.getConnection();
    const [user] = await connection.query('SELECT * FROM USER_TB WHERE id = ?', [userId]);
    const [results] = await connection.query('SELECT * FROM REQUEST_TB WHERE userId = ?', [userId]);
    connection.release();
    console.log(results)
    res.render('requests-sent', { user: user , data: results});
  } catch (err) {
    console.log(err);
    res.json({ status : 500, msg : '에러가 났어요!'});
  }
  res.render('index.ejs');
});

router.get('/app-download', function(req, res, next) {
  res.render('app-download.ejs');
});

router.get('/estimates', function(req, res, next) {
  res.render('estimates.ejs');
});

router.get('/logout', function(req, res, next) {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
});

module.exports = router;

