var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  email: String,
  password: String,
  type: String,
  name: String,
  age: Number,
  address: String,
  doctorId: Schema.Types.ObjectId,
  files: [ String ]
});

var User = mongoose.model('User', schema);

module.exports = User;