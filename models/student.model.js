const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const studentSchema = new Schema({
    studentID: {
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
    numberOfVideos: {
      type: Number,
      required: true
    },
    numberOfServices: {
      type: Number,
      required: true
    },
    profilePhotoLink: {
        type: String,
        required: true
    }
}, {timestamps: true});

const studentModel = db.model('students', studentSchema);

module.exports = studentModel;
