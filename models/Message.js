var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
var User = require('./User').userSchema;

const messageSchema = new Schema({
  message: {type: String, required: true},
  user: { type: User, required: true}
  }, {
    timestamps: { createdAt: 'created_at'}
  }
);


var Message = mongoose.model('message', messageSchema);




export default Message;
