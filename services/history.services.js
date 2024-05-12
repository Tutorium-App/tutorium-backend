const tutorialServiceModel = require('../models/tutorialService.model');

class HistoryServices {
    // Load history records for a given student ID
    static async load(studentID) {
        try {
            const histories = await tutorialServiceModel.find({ studentID: studentID });
            return histories;
        } catch (error) {
            console.error("Error fetching histories:", error);
            throw error; // Re-throw the error to be handled by the controller
        }
    }
}

module.exports = HistoryServices;
