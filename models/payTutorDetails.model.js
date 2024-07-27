const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const payTutorDetailsSchema = new Schema({
    reference: {
        type: String
    },
    recipientCode: {
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
    tutorNumber: {
        type: String
    },
    title: {
        type: String
    },
    amount: {
        type: Number
    },
    category: {
        type: String
    }
}, {timestamps: true});

const payTutorDetailsModel = db.model('payTutorDetails', payTutorDetailsSchema);

module.exports = payTutorDetailsModel;
