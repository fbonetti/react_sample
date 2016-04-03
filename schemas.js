var Schema = require('mongoose').Schema;

module.exports = {
  User: new Schema({
    email: String,
    password: String,
    name: String,
    type: String,
    age: Number,
    address: String,
    doctorId: Schema.Types.ObjectId
  })
}
