const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


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

module.exports = passport;
