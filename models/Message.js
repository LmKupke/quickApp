var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
import { userSchema } from "./User";

const messageSchema = new Schema({
  message: {type: String, required: [true, "A message is required"]},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  }, {
    timestamps: { createdAt: 'created_at'}
  }
);

messageSchema.post('save', function() {
  this.user = this.fetchCorrespondingUser();
})

messageSchema.methods.fetchCorrespondingUser = async function fetchCorrespondingUser() {
  return await this.populate('user');
}


export const messageModel = mongoose.model('message', messageSchema);

