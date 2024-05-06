const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const newTutorialServiceSchema = new Schema({
    tutorID: {
        type: String,
    },
    title: {
        type: String,
    },
    category: {
        type: String,
    },
    description: {
        type: String,
    },
    dateCreated: {
        type: String,
    },
    school: {
        type: String,
    },
    cost: {
        type: Number,
    },
    thumbnailLink: {
        type: String,
    },
    rating: {
        type: Number,
    },
    sales: {
        type: Number,
    },
});

const newTutorialServiceModel = db.model('New_Tutorial_Services', newTutorialServiceSchema);

module.exports = newTutorialServiceModel;
