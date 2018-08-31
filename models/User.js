const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

 const userSchema = new Schema({
  name:  { type: String, required: [true, "Your name is required"]},
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  location: String,
  age: Number
});


userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password,saltRounds);
  next();
});

userSchema.methods.validatePassword = async function validatePassword(password) {
  const valid = await bcrypt.compareSync(password, this.password);
  return valid;
};

const userModel = mongoose.model('users', userSchema);

export { userModel, userSchema};
