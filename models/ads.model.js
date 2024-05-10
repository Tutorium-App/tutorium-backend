const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const adsSchema = new Schema({
    adsTitle: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    adsURL: {
        type: String,
        required: true
    },
    clickCount: {
      type: Number,
      required: true
    },
    school: {
        type: String,
        required: true
    }
}, {timestamps: true});

const adsModel = db.model('ads', adsSchema);

module.exports = adsModel;
