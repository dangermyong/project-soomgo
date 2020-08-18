const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const pool = require('../utils/mysql.js');
const { requireAuth } = require('../utils/authMiddleware.js')
require('dotenv').config();

router.get('/sent', requireAuth, async (req, res, next) => {
  try{
    console.log(req.token.name)
    const connection = await pool.getConnection();
    const [user] = await connection.query('SELECT * FROM USER_TB WHERE id = ?', [req.token.id]);
    const [results] = await connection.query('SELECT * FROM REQUEST_TB WHERE userId = ?', [req.token.id]);
    connection.release();
    res.render('requests-sent', { userName: req.token.name , data: results});
  } catch (err) {
    console.log(err);
    res.json({ status : 500, msg : '에러가 났어요!'});
  }
});

module.exports = router;