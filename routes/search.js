const express = require("express");
const router = express.Router();

const pool = require('../utils/mysql.js');

router.get('/pro', async (req, res, next) => {
  try{
    const connection = await pool.getConnection();
    const [results] = await connection.query('SELECT * FROM GOSU_TB');
    connection.release();
    res.render('searchPro', {data : results});
  } catch (err) {
    console.log(err);
    res.json({ status : 500, msg : '에러가 났어요!'});
  }
  
});

module.exports = router;