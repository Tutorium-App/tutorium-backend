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
    }
}, {timestamps: true});

const paymentDetailsModel = db.model('paymentDetails', paymentDetailsSchema);

module.exports = paymentDetailsModel;
