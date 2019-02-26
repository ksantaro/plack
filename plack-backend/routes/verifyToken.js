const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
	// get auth header value
	const bearerHeader = req.headers['authorization'];
	if(typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' '); //Header comes as 'Bearer [Token]'
		const bearerToken = bearer[1];
		req.token = bearerToken;
		jwt.verify(req.token, "SecretJWTKEY1234@@@", (err, userData) => {
			if (err) {
				res.sendStatus(403); //403 Forbidden
			} else {
				req.userData = userData //get data in token
				next();
			}
		});
	} else {
		res.sendStatus(403); //403 Forbidden
	}
}

module.exports = verifyToken;