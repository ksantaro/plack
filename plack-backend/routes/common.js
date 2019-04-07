var models  = require('../models');
var express = require('express');
const jwt = require('jsonwebtoken');
const _ = require('lodash/fp');

// When creating a user, also log them in
createLoginFunction = (newUser, newChat, newUserToChat, workspace, res) => {
    const user = newUser;
    jwt.sign({user},
    "SecretJWTKEY1234@@@", 
    {expiresIn: "6h"},
    (err, token) => {
      res.json({newUser, newChat, newUserToChat, workspace, token});

    },)
}


createUser = (workspace, username, email, password, res) => {
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
        const token = createLoginFunction(newUser, newChat, newUserToChat, workspace, res);
        console.log(token);

			})
			.catch((error) => {
				res.json(error);
			})
		}).catch((error) => {
			res.json(error);
		})
	}).catch((error) => {
		res.json(error);
	});
}

module.exports = {
  createUser,
}