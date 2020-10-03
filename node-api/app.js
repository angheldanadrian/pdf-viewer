const express = require('express');
const session = require('express-session');

const passport = require('passport');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;
const authService = require('./auth/authService')
const router = require('./routes/router');


passport.use(new LocalStrategy(
	function (username, password, done) {
		if (username === "admin" && password === "admin") {
			return done(null, username);
		} else {
			return done("1 access", false);
		}
	}
));

passport.serializeUser(function (user, done) {
	if (user) done(null, user);
});

passport.deserializeUser(function (id, done) {
	done(null, id);
});


const app = new express();

app.use(session({secret: 'anything', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());


app.post('/authenticate', authService.auth(), (req, res) => {
	res.status(200).json({"statusCode": 200, "user": req.user});
});

app.use('/', authService.isLoggedIn, router)


app.listen(3000, () => {
	console.log('App running at 3000')
})

module.exports = app;
