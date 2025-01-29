const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const messageSchema = new Schema({
    messageID: {
        type: String,
    },
    message: {
        type: String,
    }
});

const messageModel = db.model('messages', messageSchema);

module.exports = messageModel;
