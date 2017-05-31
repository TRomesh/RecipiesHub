const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Recipe = new Schema({
  creator:String,
  fname:String,
  type:String,
  image:String,
  description:String,
  created:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('recipe',recipe);
