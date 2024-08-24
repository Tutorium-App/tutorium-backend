const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const appDataSchema = new Schema({
    app1Version: {
        type: String,
    },
    app2Version: {
        type: String,
    },
    app1ShareLink: {
        type: String,
    },
    app2ShareLink: {
        type: String,
    },
    app1ShareText: {
        type: String,
    },
    app2ShareText: {
        type: String,
    }
}, {timestamps: true});

const appDataModel = db.model('appData', appDataSchema);

module.exports = appDataModel;
