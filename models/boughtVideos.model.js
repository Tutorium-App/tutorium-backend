const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const boughtTutorialVideoSchema = new Schema({
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
    videoLink: {
        type: String,
    },
    rating: {
        type: Number,
    },
    sales: {
        type: Number,
    },
});

const boughtTutorialVideoModel = db.model('BoughtTutorialVideos', boughtTutorialVideoSchema);

module.exports = boughtTutorialVideoModel;
