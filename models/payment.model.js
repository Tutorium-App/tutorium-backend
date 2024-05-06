const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const paymentSchema = new Schema({
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
    }
});

const paymentModel = db.model('Payments', paymentSchema);

module.exports = paymentModel;
