const express = require("express");
const router = express.Router();

const pool = require('../utils/mysql.js');

router.get('/gosu/:gosuId', async (req, res, next) => {
  try{
    const connection = await pool.getConnection();
    const [results] = await connection.query('SELECT * FROM GOSU_TB WHERE id = ?', req.params.gosuId);
    connection.release();
    res.render('profile', {data : results[0]});
    // res.json({ status : 200, arr: results2 });
  } catch (err) {
    console.log(err);
    res.json({ status : 500, msg : '에러가 났어요!'});
  }
  
});

module.exports = router;