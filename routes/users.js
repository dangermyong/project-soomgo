const express = require('express');
const fs = require('fs');
const path = require('path');
const sanitizeHtml = require('sanitize-html')
const router = express.Router();
const app = express()


/* GET users listing. */
router.get('/', function(req, res, next) {
  const randomNumber = Math.random().toString();
  res.send(randomNumber);
});

app.get('/index/:userId', (request, response) =>
  fs.readdir('./data', function(error, filelist){
    let filteredId = path.parse(request.params.userId).base;
    fs.readFile(`data/${userId}`, 'utf8', function(err, description){
      let title = request.params.userId;
      let sanitizedTitle = sanitizeHtml(title);
    })
  })
)




module.exports = router;
  