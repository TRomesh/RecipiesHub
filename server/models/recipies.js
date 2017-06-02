const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Recipe = new Schema({
  cname:String,
  creator:String,
  fname:String,
  type:String,
  image:{ type: String, default: 'none' },
  description:String,
  created:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('recipe',Recipe);
