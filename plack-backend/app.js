var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var sessions = require('client-sessions');

var client = require('./postgres.js');
client.connect();		//Establish connection with client
var currentClient = client.getClient();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Use SSL so app only communicates w/ browser over encrypted channel
app.use(sessions({
	cookieName: 'session',
	secret: 'ieonvvuovew84306840&#&_#@H#GH#@)VN)8vwe',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
	httpOnly: true,   //prevents browser JS from accessing cookies
	secure: true,     //ensures cookies are only used over HTTPS
	ephemeral: true   //deletes the cookie when the browser is closed
}));

//Session middleware
app.use(function(req, res, next) {
	if (req.session && req.session.user) {
		//Query to get all comments from current post
		const query = {
			text: 'SELECT * FROM users WHERE email = $1', 
			values: [req.session.user.email]
		}	
		//Run query storing relevant info in newsfeed.ejs page
		currentClient.query(query, (err, result)=> {
			if (err) {
				console.log(err);
			} else {
				if(result.rows.length != 0) {
					req.user = result.rows[0];
					delete req.user.password; 			// delete the password from the session
					req.session.user = result.rows[0];  //refresh the session value
					res.locals.user = result.rows[0];
				}
			}
			// finishing processing the middleware and run the route
			next();
		});
	} else {
		next();
	}
});


/* middleware and options used to allow cross origin posts from react to express */
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      //respond with 200
      res.sendStatus(200);
    }
    else {
    //move on
      next();
    }
});

app.options("/*", function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	res.send(200);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
