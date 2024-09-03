const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const paymentDetailsSchema = new Schema({
    paymentReference: {
        type: String
    },
    tutorialID: {
        type: String
    },
    tutorID: {
        type: String
    },
    tutorName: {
        type: String
    },
    tutorEmail: {
      type: String
    },
    studentID: {
        type: String
    },
    studentName: {
        type: String
    },
    studentNumber: {
        type: String
    },
    studentEmail: {
        type: String
    },
    tutorNumber: {
        type: String
    },
    tutorialTitle: {
        type: String
    },
    amount: {
        type: Number
    },
    category: {
        type: String
    },
    imageURL: {
        type: String
    },
    requestID: {
        type: String,
        required: false
    },
    isRequest: {
        type: Boolean,
        false: false
    }
}, {timestamps: true});

const paymentDetailsModel = db.model('paymentDetails', paymentDetailsSchema);

module.exports = paymentDetailsModel;
