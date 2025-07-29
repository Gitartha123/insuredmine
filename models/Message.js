const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    message: String,
    scheduledAt: String,
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Message', messageSchema);