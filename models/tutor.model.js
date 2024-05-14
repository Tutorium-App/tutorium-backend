const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const tutorSchema = new Schema({
    tutorID: {
        type: String,
        unique: true,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    dateCreated: {
      type: String,
      required: true
    },
    school: {
        type: String,
        required: true
    },
    program: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    numberOfVideos: {
      type: Number,
      required: true
    },
    numberOfServices: {
      type: Number,
      required: true
    },
    balance: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    numberOfRatings: {
      type: Number,
      required: true
    },
    sales: {
      type: Number,
      required: true
    },
    verified: {
        type: String,
        required: true
    },
    profilePhotoLink: {
        type: String,
        required: true
    }
}, {timestamps: true});

const tutorModel = db.model('Tutors', tutorSchema);

module.exports = tutorModel;
