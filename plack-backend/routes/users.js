var express = require('express');
var router = express.Router();

var client = require('../postgres.js');
var currentClient = client.getClient();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  const data = req.body.data;
  const loginQuery = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [data.email]
  }
  currentClient.query(loginQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
    }
  });
});

router.post('/register', function(req,res) {
  const data = req.body.data;
  const registerQuery = {
    text: 'INSERT INTO users(first_name, last_name, username, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *',
    values: [data.first_name, data.last_name, data.username, data.email, data.password]
  }
  currentClient.query(registerQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
});

router.get('/login', function(req,res) {

});

module.exports = router;
