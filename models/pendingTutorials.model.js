const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const pendingTutorialSchema = new Schema({
    tutorID: {
        type: String,
    },
    studentID: {
        type: String,
    },
    tutorName: {
        type: String,
    },
    studentName: {
        type: String,
    },
    studentEmail: {
        type: String,
    },
    tutorEmail: {
        type: String,
    },
    tutorialTitle: {
        type: String,
    },
    cost: {
        type: Number,
    },
    qrCode: {
        type: String,
    },
    tutorNumber: {
        type: String,
    },
    studentNumber: {
        type: String,
    }
});

const pendingTutorialModel = db.model('PendingTutorial', pendingTutorialSchema);

module.exports = pendingTutorialModel;
