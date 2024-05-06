const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const adsSchema = new Schema({
    adsTitle: {
        type: String,
    },
    adsURL: {
        type: Number,
    },
    imageURL: {
        type: String,
    },
    clickCount: {
        type: Number,
    },
});

const adsModel = db.model('ads', adsSchema);

module.exports = adsModel;
