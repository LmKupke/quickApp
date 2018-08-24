const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  location: String,
  age: Number
});

userSchema.pre('save', function(next) {
  var currentDate = new Date();

  this.updated_at = currentDate;

  if(!this.created_at)
    this.created_at = currentDate;
})

var User = mongoose.model('users', userSchema);

module.exports = User;
