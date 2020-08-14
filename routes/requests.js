const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const pool = require('../utils/mysql.js');
require('dotenv').config();

router.get('/sent', async (req, res, next) => {
  try{
    // const token = req.headers['x-access-token'];
    const token = JSON.parse(localStorage.getItem('token'))
    let payload
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.json({ status: 401, msg: '너 권한 없음'});
    } 
    // res.json({ status:200, msg: payload.id})
      // if (payload.id !== Number(req.params.id)) {
      //   return res.json({ status: 403, msg: '이 유저에 대한 정보를 볼 권한 없어!' });
      // }
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
});


module.exports = router;