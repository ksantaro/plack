var express = require('express');
var router = express.Router();

var client = require('../postgres.js');
var currentClient = client.getClient();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  // console.log(req.body.data);
  const data = req.body.data;
  const loginQuery = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [data.email]
  }

  currentClient.query(loginQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if(result.rows.length == 0) { //if user does not exist
        console.log('user does not exist');
      } else {
        if (data.password == result.rows[0].password) { //if passwords match set session
          console.log(result.rows[0]);
          req.session.user = result.rows[0];
          // req.session.save();

          res.send(req.session.user);

          // console.log(req.session);
          console.log("user succesfully logged in")
          //res("success");
        }
      }
    }
  });
});

router.post('/session', function(req,res) {
  if (req.session) {
    console.log(req.session.user);
    res.send(req.session);
  }
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



module.exports = router;
