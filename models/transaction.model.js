const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const transactionSchema = new Schema({
    date: {
        type: String,
    },
    time: {
        type: String,
    },
    tutorialType: {
        type: String,
    },
    amountPaid: {
        type: Number,
    },
    tutorAmount: {
        type: Number,
    },
    tutoriumProfit: {
        type: Number,
    }
});

const transactionModel = db.model('transactions', transactionSchema);

module.exports = transactionModel;
