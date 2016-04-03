var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  email: String,
  password: String,
  type: String,
  age: Number
});

var User = mongoose.model('User', schema);

module.exports = User;