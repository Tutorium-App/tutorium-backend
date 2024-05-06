const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const studentSchema = new Schema({
    studentID: {
        type: String,
    },
    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    dateCreated: {
        type: String,
    },
    school: {
        type: String,
    },
    program: {
        type: String,
    },
    year: {
        type: String,
    },
    numberOfVideos: {
        type: Number,
    },
    numberOfServices: {
        type: Number,
    },
    profilePhotoLink: {
        type: String,
    }
});

const studentModel = db.model('students', studentSchema);

module.exports = studentModel;
