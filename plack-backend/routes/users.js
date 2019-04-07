var models  = require('../models');
var express = require('express');
var router = express.Router();

// var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash/fp');

const verifyToken = require('./verifyToken');
const {createUser} = require('./common');


// var client = require('../postgres.js');
// var currentClient = client.getClient();

// TODO hash passwords after most of the app implementation use bcrypt

function vToken(token) {
	jwt.verify(token, "SecretJWTKEY1234@@@");
}



//Format of token
// Authorization: Bearer <access_token>

// function verifyToken(req, res, next) {
// 	// get auth header value
// 	const bearerHeader = req.headers['authorization'];
// 	if(typeof bearerHeader !== 'undefined') {
// 		const bearer = bearerHeader.split(' '); //Header comes as 'Bearer [Token]'
// 		const bearerToken = bearer[1];
// 		req.token = bearerToken;
// 		jwt.verify(req.token, "SecretJWTKEY1234@@@", (err, userData) => {
// 			if (err) {
// 				res.sendStatus(403); //403 Forbidden
// 			} else {
// 				req.userData = userData //get data in token
// 				next();
// 			}
// 		});
// 	} else {
// 		res.sendStatus(403); //403 Forbidden
// 	}
// }

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
	const { username, password, workspace_url } = req.body;
	console.log(workspace_url);
	models.Workspace.findAll({
		where: {
			workspace_url: workspace_url
		}
	}).then(function(workspaces) {
		if(workspaces.length === 0) {
			res.status(401).send('ERROR: workspace not found')
			// res.json("ERROR: workspace not found")
		} else {
			const workspace_id = workspaces[0].workspace_id;
			models.User.findAll({
				attributes: ['user_id', 'workspace_id', 'username', 'email'],
				where: {
					workspace_id: workspace_id,
					username: username,
					password: password, //can remove this and validate later //to seperate username error and password error
				}
			}).then(function(users) {
				if (users.length === 0) {
					// res.json("ERROR: email does not exist or password is incorrect");
					res.status(401).send('ERROR: username or password is incorrect');
				} else {
					// res.json(users[0]);
					const user = users[0];
					jwt.sign({user},
					"SecretJWTKEY1234@@@", 
					{expiresIn: "6h"},
					(err, token) => {
						res.json({token}); //needs to contain auth data
					}); 
				}
			})
		}
	});
});

//can become a middle ware to check it is verified !!!!!!!!
router.get('/isAuthenticated', verifyToken, function(req,res) {
	res.json({
		isAuthenticated: true,
		userData: req.userData
	});
});

router.post('/create', (req,res) => {
	const {workspace, username, email, password} = req.body;
	console.log(workspace);
	console.log(username);
	console.log(email);
	console.log(password);
	createUser(workspace, username, email, password, res);
});

// router.get('/current-user', verifyToken, function(req,res) {

// });

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
