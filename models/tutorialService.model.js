const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const tutorialServiceSchema = new Schema({
    tutorID: {
        type: String,
    },
    tutorName: {
        type: String,
    },
    tutorEmail: {
        type: String,
    },
    tutorNumber: {
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
    tutorialType: {
        type: String,
    }
});

const tutorialServiceModel = db.model('TutorialServices', tutorialServiceSchema);

module.exports = tutorialServiceModel;
