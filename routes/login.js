const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const jwt = require("jsonwebtoken");

const pool = require('../utils/mysql.js');

if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

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
    const payload = { id: user.id };
    const token = await jwt.sign(payload, process.env.JWT_SECRET);
    localStorage.setItem('token', JSON.stringify(token))
    // res.json({ status : 201, token: token});
    res.redirect('/requests/sent')
  } catch (error) {
      console.log(error);
      res.json({ status:500, msg: "에러가 났어요!"});
  }
})

module.exports = router;