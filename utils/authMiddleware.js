const jwt = require('jsonwebtoken');
const pool = require('../utils/mysql.js');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

// check current user
const checkUser = async (req, res, next) => {
  try{
    const token = req.cookies.jwt;
    let payload
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      res.locals.user = null
      next()
    }
    if (token) {
    const userId = payload.id;
    const connection = await pool.getConnection();
    const [user] = await connection.query('SELECT id, name, email FROM USER_TB WHERE id = ?', [userId]);
    connection.release();
    res.locals.user = user
    next()
    }
  } catch (error) {
    res.locals.user = null
    next()
  }
};

const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}

module.exports = { requireAuth, checkUser, logout };
