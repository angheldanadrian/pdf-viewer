const express = require('express');
const session = require('express-session');

const bodyParser = require('body-parser');
const authService = require('./auth/authService');
const passport = require('./auth/passport');

const app = new express();

app.use(session({secret: 'anything', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());


app.post('/authenticate', authService.auth(), (req, res) => {
	res.status(200).json({"statusCode": 200, "user": req.user});
});

const pdf = require('./routes/pdf');
app.use('/pdf', authService.isLoggedIn, pdf);


app.listen(3000, () => {
	console.log('App running at 3000')
})

module.exports = app;
