const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    tutorID: {
        type: String,
    },
    tutorialID: {
        type: String,
    },
    studentName: {
        type: String,
    },
    studentYear: {
        type: String,
    },
    tutorialTitle: {
        type: String,
    },
    rating: {
        type: Number,
    },
    comment: {
        type: String,
    },
    profilePhotoLink: {
        type: String,
    },
});

const reviewModel = db.model('Reviews', reviewSchema);

module.exports = reviewModel;
