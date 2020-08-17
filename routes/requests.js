const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const pool = require('../utils/mysql.js');
require('dotenv').config();

router.get('/sent', async (req, res, next) => {
  try{
    const token = req.cookies.jwt;
    let payload
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log(payload)
    } catch (error) {
      return res.json({ status: 401, msg: '너 권한 없음'});
    } 
    const userId = payload.id;
    const connection = await pool.getConnection();
    const [user] = await connection.query('SELECT * FROM USER_TB WHERE id = ?', [userId]);
    const [results] = await connection.query('SELECT * FROM REQUEST_TB WHERE userId = ?', [userId]);
    connection.release();
    console.log(user[0])
    res.render('requests-sent', { user: user , data: results});
  } catch (err) {
    console.log(err);
    res.json({ status : 500, msg : '에러가 났어요!'});
  }
});

module.exports = router;