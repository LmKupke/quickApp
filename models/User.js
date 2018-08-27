const mongoose = require('mongoose');
var Schema = mongoose.Schema;

 const userSchema = new Schema({
  name: String,
  username: { type: String, required: true },
  password: { type: String, required: true},
  location: String,
  age: Number
});


const userModel = mongoose.model('users', userSchema);

export { userModel, userSchema};
