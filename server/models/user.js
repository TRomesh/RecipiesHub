const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const User = new Schema({
  fname:String,
  lname:String,
  uname:{type:String,unique:true},
  email:{type:String,unique:true,lowercase:true},
  password:String
});

// On Save Hook, encrypt password
// Before saving a model, run this function
User.pre('save', function (next) {
  //get access to the user model
  const user = this;

  // generate a salt then run callback
  bcrypt.genSalt(10, function (err, salt) {
    if (err) { return next(err); }

    // hash (encrypt) our password using the sale
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) { return next(err); }

      //overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

// compare passwords is equal to user's password
User.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  })
}

module.exports = mongoose.model('User',User);
