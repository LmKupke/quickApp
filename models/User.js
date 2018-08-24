const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  location: String,
  age: Number
});


var User = mongoose.model('users', userSchema);

module.exports = User;
