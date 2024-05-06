const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const acceptedTutorialRequestSchema = new Schema({
    studentRequestID: {
        type: String,
    },
    studentID: {
        type: String,
    },
    tutorID: {
        type: String,
    },
    studentName: {
        type: String,
    },
    tutor: {
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
    amount: {
        type: Number,
    },
});

const acceptedTutorialRequestModel = db.model('AcceptedTutorialRequest', acceptedTutorialRequestSchema);

module.exports = acceptedTutorialRequestModel;
