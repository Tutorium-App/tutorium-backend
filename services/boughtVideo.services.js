const boughtVideoModel = require('../models/boughtVideos.model');

class BoughtVideoServices {
    // Fetch reviews using a tutorID
    static async loadBoughtVideos(studentID) {
        try {
            const boughtVideos = await boughtVideoModel.find({ studentID: studentID });
            return boughtVideos;
        } catch (error) {
            console.error("Error fetching boughtVideos:", error);
            throw error; // Re-throw the error to be handled by the controller
        }
    }

    // Create a new review
    static async createBoughtVideo(tutorID, tutorName, tutorEmail, tutorNumber, title, category, description, dateCreated, school, cost, thumbnailLink, videoLink) {
        try {
            const boughtVideo = new boughtVideoModel({
                tutorID, tutorName, tutorEmail, tutorNumber, title, category, description, dateCreated, school, cost, thumbnailLink, videoLink
            });
            await boughtVideo.save();
            return boughtVideo;
        } catch (error) {
            console.error("Error creating boughtVideo:", error);
            throw error;
        }
    }
}

module.exports = BoughtVideoServices;
