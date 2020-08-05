const express = require("express");
const router = express.Router();

const pool = require('../utils/mysql.js');

router.get('/pro', async (req, res, next) => {
  search = req.query.search.replace(" ","|");
  if ( search == null ) { search = "" }
    try{
      const connection = await pool.getConnection();
      const [results] = await connection.query('SELECT * FROM GOSU_TB WHERE CONCAT(subject, address) REGEXP ?', search);
      connection.release();
      res.render('searchPro', {data : results});
    } catch (err) {
      console.log(err);
      res.json({ status : 500, msg : '에러가 났어요!'});
    }
  });
// router.get('/pro', async (req, res, next) => {
//   searchOptions = req.query.search;
//   if ( searchOptions == null ) { searchOptions = "" }
//     try{
//       const connection = await pool.getConnection();
//       const [results] = await connection.query('SELECT * FROM GOSU_TB WHERE CONCAT(subject, address) LIKE "%"?"%" OR CONCAT(subject, address) LIKE "%"?"%"',[searchOptions, searchOptions]);
//       connection.release();
//       res.render('searchPro', {data : results});
//     } catch (err) {
//       console.log(err);
//       res.json({ status : 500, msg : '에러가 났어요!'});
//     }
//   });

module.exports = router;