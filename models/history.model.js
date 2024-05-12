const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const historySchema = new Schema({
    tutorID: {
        type: String,
    },
    tutorName: {
        type: String,
    },
    studentID: {
        type: String,
    },
    title: {
        type: String,
    },
    category: {
        type: String,
    },
    description: {
        type: String,
    },
    dateEnded: {
        type: String,
    },
    cost: {
        type: Number,
    }
});

const historyModel = db.model('history', historySchema);

module.exports = historyModel;
