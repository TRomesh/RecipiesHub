const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const User = require('../models/user');


// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  // Verify this username and password, call done with the user
  // if it is the correct username and password
  // otherwise, call done with false
  User.findOne({ email: email }, function (err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    // compare passwords - is `password` equal to user.password before login
    user.comparePassword(password, function (err, isMatch) {
      if (err) { return err; }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });
  });
});


// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: 'asasasas'
};


// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // See if the use ID in the payload exists in our database
  // If it does, call 'done' with that user
  // otherwise, call done without a user object
  User.findById(payload.sub, function (err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this Strategy

passport.use(jwtLogin);
passport.use(localLogin);
