const express = require("express");
const router = express.Router();
const pool = require('../utils/mysql.js');

router.get('/pro', async (req, res, next) => {
  let searchOptions = req.query.search;
  let searchQuery ="hi";
  if (typeof searchOptions == "undefined") {
    searchQuery = "SELECT * FROM GOSU_TB"
  } else if (searchOptions.indexOf(' ') >= 0) {
    searchOptions = searchOptions.replace(" ","|");
    searchQuery = `SELECT * FROM GOSU_TB WHERE CONCAT(subject, address) REGEXP "${searchOptions}"`;
  } else {
    searchQuery = `SELECT * FROM GOSU_TB WHERE CONCAT(subject, address) REGEXP "${searchOptions}"`;
  }
  try{
    const connection = await pool.getConnection();
    const [results] = await connection.query(searchQuery);
    for (result of results) {
      console.log(result.id);
      const [review] = await connection.query(`SELECT * FROM REVIEW_TB WHERE gosu_id = ${result.id}`);
      result.review_name = review[0].user_name;
      result.review_comment = review[0].comment;
      console.log(result);
    }
    connection.release();
    res.render('searchPro', {data : results});
  } catch (err) {
    console.log(err);
    res.json({ status : 500, msg : '에러가 났어요!'});
  }
});

module.exports = router;