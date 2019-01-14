var models  = require('../models');
var express = require('express');
var router = express.Router();

// var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var client = require('../postgres.js');
var currentClient = client.getClient();

// TODO hash passwords after most of the app implementation use bcrypt

// Implementation Functions
function createToken(user) {
	return jwt.sign(_.omit(user, 'password'), "SecretJWTKEY1234@@@", {expiresInMinutes: 60*5});
}

//GET all users
router.get('/', function(req, res) {
  models.User.findAll().then(function(users) {
        res.json(users);
  });
});

//GET users based on a workspace ID
router.get('/workspace/:workspace_id', function(req, res) {
  models.User.findAll({
      where: {
          workspace_id: req.params.workspace_id
      }
  }).then(function(users) {
      res.json(users);
  });
});

//Post a new workspace with a new user
// router.get('/', function(req, res) {

// });

router.post('/login', function(req, res) {
	const { email, password, workspace_url } = req.body;
	console.log(workspace_url);
	models.Workspace.findAll({
		where: {
			workspace_url: workspace_url
		}
	}).then(function(workspaces) {
		if(workspaces.length === 0) {
			res.json("ERROR: workspace not found")
		} else {
			const workspace_id = workspaces[0].workspace_id;
			models.User.findAll({
				where: {
					workspace_id: workspace_id,
					email: email,
					password: password,
				}
			}).then(function(users) {
				if (users.length === 0) {
					res.json("ERROR: email does not exist or password is incorrect");
				} else {
					res.json(users);
				}
			})
		}
	});
});

// OLD BACKEND
// router.post('/login', function(req, res, next) {
//   const data = req.body.data;
//   const loginQuery = {
//     text: 'SELECT * FROM users WHERE email = $1',
//     values: [data.email]
//   }

//   currentClient.query(loginQuery, (err, result) => {
    
//     if (err) {
//       console.log(err);
//     } else {
//       if(result.rows.length == 0) { //if user does not exist
//         console.log('user does not exist');
//       } else {
//         if (data.password == result.rows[0].password) { //if passwords match set session
//           req.session.user = result.rows[0];
//           res.json(req.session.user);
//         }
//       }
//     }
//   });
// });

// router.post('/session', function(req,res) {
//   if (req.session) {
//     res.json(req.session);
//   }
// });

// router.post('/register', function(req,res) {
//   const data = req.body.data;
//   const registerQuery = {
//     text: 'INSERT INTO users(first_name, last_name, username, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *',
//     values: [data.first_name, data.last_name, data.username, data.email, data.password]
//   }
//   currentClient.query(registerQuery, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       let userID = result.rows[0].uid;
//       const addSelfFriend = {
//         text: 'INSERT INTO friends(uid1, uid2) VALUES($1, $1) RETURNING *',
//         values: [userID]
//       }
//       currentClient.query(addSelfFriend, (err2, result2) => {
//         if (err2) {
//           console.log(err2);
//         } else {
//           let userFriendID = result2.rows[0].ufid;
//           let welcomeMessage = "Hello and welcome to plack! Please use this space to take any notes";
//           const startMessage = {
//             text: 'INSERT INTO direct_messages(ufid, text, senderid) VALUES($1, $2, $3) RETURNING *',
//             values: [userFriendID, welcomeMessage, userID] // own id will be used for notes
//           }
//           currentClient.query(startMessage, (err3, result3) => {
//             if (err3) {
//               console.log(err3);
//             } else {
//               res.send(result3);
//             }
//           });
//         }
//       });
//     }
//   });
// });



module.exports = router;
