const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  location: String,
  age: Number
});


var Model = mongoose.model('users', userSchema);

module.exports = Model;
