const tutorialVideoModel = require('../models/tutorialVideo.model');

class VideosServices {
    // Fetch all tutorial videos for a given school
    static async fetchAllVideos(school) {
        try {
            const videos = await tutorialVideoModel.find({ school: school });
            return videos;
        } catch (error) {
            console.error("Error fetching all tutorial videos:", error);
            throw error; // Re-throw the error to be handled by the controller
        }
    }

    // Fetch popular tutorial videos for a given school
    static async fetchPopularVideos(school) {
        try {
            const popularVideos = await tutorialVideoModel
                .find({ school: school })
                .sort({ sales: -1 })
                .limit(5); // Limit the results to top 5 videos
            return popularVideos;
        } catch (error) {
            console.error("Error fetching popular tutorial videos:", error);
            throw error;
        }
    }

    // Fetch tutorial videos by tutor ID
    static async fetchTutorVideos(tutorID) {
        try {
            const videos = await tutorialVideoModel.find({ tutorID: tutorID });
            return videos;
        } catch (error) {
            console.error("Error fetching tutorial videos by tutor ID:", error);
            throw error; // Re-throw the error to be handled by the controller
        }
    }
}

module.exports = VideosServices;
