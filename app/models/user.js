const mongoose = require('mongoose');

const User = mongoose.model('User', {
  username: String,
  password: String,
  type: String,
  age: Number
});

export default User;