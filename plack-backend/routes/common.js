var models  = require('../models');
var express = require('express');
const jwt = require('jsonwebtoken');
const _ = require('lodash/fp');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// When creating a user, also log them in
createLoginFunction = (req, res, next) => {
  const {newUser, newChat, newUserToChat, workspace} = req.newData;
  const user = newUser;
  jwt.sign({user},
  "SecretJWTKEY1234@@@", 
  {expiresIn: "6h"},
  (err, token) => {
    console.log(`COMMON 15:${token}`);
    res.json({newUser, newChat, newUserToChat, workspace, token})
    // req.newData = {newUser, newChat, newUserToChat, workspace, token};
    // next();
  },)
}

// checkIfUserExists = (username, email, res) => {
//   models.User.find({
//     where: {
//       username: req.params.workspace.username,
//       [Op.or]: [{username}, {email}]
//     }
//   }).then((user) => {
//     res.json()
//   })
// }

checkIfUserExists = (req, res, next) => {
  const {workspace, username, email, password} = req.body;
  models.User.find({
    where: {
      workspace_id: workspace.workspace_id,
      username,
    }
  }).then((user1) => {
    if(user1 !== null) {
      res.status(400).send(
          {
            username: 'ERROR: username already exsits in this workspace',
          }
      );
    } else {
      models.User.find({
        where: {
          workspace_id: workspace.workspace_id,
          email,
        }
      }).then((user2) => {
        if(user2 !== null) {
          res.status(400).send(
            {
              email: "ERROR: email already exsits in this workspace",
            }
        );
        } else {
          console.log("COMMON 58: NEXT");
          next();
        }
      });
    }
  });
}

createWorkspace = (req, res, next) => {
    const {workspace_url, workspace_name, username, email, password} = req.body;
    console.log(workspace_url)
    models.Workspace.build({
      workspace_url,
      name: workspace_name,
      createdAt: new Date(),
      updatedAt: new Date(),
      })
      .save()
      .then((newWorkspace) => {
          req.body.workspace = newWorkspace;
          next();
          // createUser(newWorkspace, username, email, password, res);
      })
      .catch((error) => {
          console.log(error);
          res.json(error);
      })
  }

createUser = (req, res, next) => {
  const {workspace, username, email, password} = req.body;
	models.User.build({
		workspace_id: workspace.workspace_id,
		username,
		email,
		password,
		createdAt: new Date(),
		updatedAt: new Date(),
	})
	.save()
	.then((newUser) => {
		// res.json(newUser);
		models.Chat.build({
			name: "me",
			is_channel: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		})
		.save()
		.then((newChat) => {
			models["User-Chats"].build({
				chat_id: newChat.chat_id,
				user_id: newUser.user_id,
				createdAt: new Date(),
				updatedAt: new Date(),
			})
			.save()
			.then((newUserToChat) => {
        console.log(createLoginFunction);
        req.newData = {newUser, newChat, newUserToChat, workspace};
        next();
        // createLoginFunction(newUser, newChat, newUserToChat, workspace, res);
			})
			.catch((error) => { // Build User-Chat
				res.json(error);
			})
		}).catch((error) => { // Build Chat
			res.json(error);
		})
	}).catch((error) => { // Build User
		res.json(error);
	});
}

module.exports = {
  createUser,
  checkIfUserExists,
  createWorkspace,
  createLoginFunction,
}