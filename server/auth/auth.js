const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

const User = require('../models/user');

function tokenForUser(user){
    const timpestamp = new Date().getTime();
    return jwt.encode({sub:user.id,iat:timpestamp,usr:user.uname},'asasasas');
}

exports.signin = function (req, res, next) {
  // User had already had their email and pass auth'd
  //  We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = function (req, res, next) {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const uname = req.body.uname;
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ 'error': 'You must provide email and password' })
  }

  // See if a user with given email exists
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // If a user email does NOT exist, create and save user record
    const user = new User({
      fname: fname,
      lname: lname,
      uname: uname,
      email: email,
      password: password
    });

    user.save(function (err) {
      if (err) { return next(err); }

      // Respond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
}
