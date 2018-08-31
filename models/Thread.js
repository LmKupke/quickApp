const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const threadSchema = new Schema({
  messages: { type: mongoose.SchemaTypes.ObjectId, ref: 'message'},
  participants: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'users'}]
});

export const threadModel = mongoose.model('thread', threadSchema);


