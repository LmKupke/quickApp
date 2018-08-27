var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
import { userSchema } from "./User";

const messageSchema = new Schema({
  message: {type: String, required: true},
  user: { type: userSchema, required: true}
  }, {
    timestamps: { createdAt: 'created_at'}
  }
);


export const messageModel = mongoose.model('message', messageSchema);

