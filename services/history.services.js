const historyModel = require('../models/history.model');

class HistoryServices {
    // Load history records for a given student ID
    static async load(studentID) {
        try {
            const histories = await historyModel.find({ studentID: studentID });
            return histories;
        } catch (error) {
            console.error("Error fetching histories:", error);
            throw error; // Re-throw the error to be handled by the controller
        }
    }


    // Create a new hisory
    static async createHistory(tutorID, tutorName, studentID, title, category, dateEnded, cost) {
        try {
            const newHistory = new historyModel({
                tutorID,
                tutorName,
                studentID,
                title,
                category,
                dateEnded,
                cost
            });
            await newHistory.save();
            return newHistory;
        } catch (error) {
            console.error("Error creating history:", error);
            throw error;
        }
    }
}

module.exports = HistoryServices;
