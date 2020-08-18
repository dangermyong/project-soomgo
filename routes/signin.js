const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const pool = require('../utils/mysql.js');


router.get('/', function(req, res, next){
  res.render('signin.ejs')
})

router.get('/user', function(req, res, next){
  res.render('user-signin.ejs')
})

router.post('/user', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const saltByte = await crypto.randomBytes(64);
  const salt = saltByte.toString('base64');
  const hashedPwdByte = crypto.pbkdf2Sync(password, salt, 100000, 64, 'SHA512');
  const hashedPassword = hashedPwdByte.toString('base64');

  const connection = await pool.getConnection();
  await connection.query('INSERT INTO USER_TB(name, email, hashedPassword, salt) VALUES(?, ?, ?, ?)', [name, email, hashedPassword, salt]);
  connection.release();
  res.redirect('/login')

})

module.exports = router;
