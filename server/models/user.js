const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  fname:String,
  lname:String,
  uname:{type:String,unique:true},
  email:{type:String,unique:true,lowercase:true},
  password:String
});

module.exports = mongoose.model('user',User);
