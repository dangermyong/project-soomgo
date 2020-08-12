const express = require("express");
const router = express.Router();
const crypto = require('crypto');

const pool = require('../utils/mysql.js');

router.get('/', (req, res, next) => {
  res.render('login.ejs');
});

router.post('/', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const connection = await pool.getConnection();
    const [users] = await connection.query('SELECT * FROM USER_TB WHERE email = ?', email);
    if (users.length == 0) {
      connection.release();
      return res.json({ status: 401, msg: "일치하지 않는 이메일 입니다."})
    }
    const user = users[0];
    const loginHashedPwdByte = crypto.pbkdf2Sync(password, user.salt, 100000, 64, 'SHA512');
    const loginHashedPwd = loginHashedPwdByte.toString('base64');
    if (loginHashedPwd !== user.hashedPassword) {
      connection.release();
      return res.json({ status: 401, msg: "일치하지 않는 비밀번호 입니다."})
    }
    connection.release();
    res.json({ status: 200, msg: "로그인 성공"});
  } catch (error) {
      console.log(error);
      res.json({ status:500, msg: "에러가 났어요!"});
  }
  
  // const saltByte = await crypto.randomBytes(64);
  // const salt = saltByte.toString('base64');
  // const hashedPwdByte = crypto.pbkdf2Sync(password, salt, 100000, 64, 'SHA512');
  // const hashedPassword = hashedPwdByte.toString('base64');

  // const connection = await pool.getConnection();
  // await connection.query('INSERT INTO USER_TB(name, email, hashedPassword, salt) VALUES(?, ?, ?, ?)', [name, email, hashedPassword, salt]);
  // connection.release();
  // res.json({ status : 201, msg : 'data added!'});

})

module.exports = router;