const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const tutorialRequestSchema = new Schema({
    studentID: {
        type: String,
    },
    studentName: {
        type: String,
    },
    studentEmail: {
        type: String,
    },
    role: {
        type: String,
    },
    requestType: {
        type: String,
    },
    description: {
        type: String,
    },
    budget: {
        type: String,
    },
    validUntil: {
        type: String,
    },
    amount: {
        type: Number,
    },
});

const tutorialRequestModel = db.model('TutorialRequest', tutorialRequestSchema);

module.exports = tutorialRequestModel;
