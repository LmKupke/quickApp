const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let roomSchema = new Schema({
    title: { type: String, required: true },
    connections: { type: [{ userId: String, socketId: String }]}
});
