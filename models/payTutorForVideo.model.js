const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const payTutorForVideoDetailsSchema = new Schema({
    reference: {
        type: String
    },
    recipientCode: {
        type: String
    },
    tutorName: {
        type: String
    },
    tutorNumber: {
        type: String
    },
    amount: {
        type: Number
    },
}, {timestamps: true});

const payTutorForVideoDetailsModel = db.model('payTutorForVideoDetails', payTutorForVideoDetailsSchema);

module.exports = payTutorForVideoDetailsModel;
