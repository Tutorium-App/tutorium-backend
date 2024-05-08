const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const tutorialServiceSchema = new Schema({
    tutorID: {
        type: String,
    },
    studentID: {
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
    cost: {
        type: Number,
    }
});

const tutorialServiceModel = db.model('TutorialServices', tutorialServiceSchema);

module.exports = tutorialServiceModel;
