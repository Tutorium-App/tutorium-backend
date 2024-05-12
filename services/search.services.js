const tutorialVideoModel = require('../models/tutorialVideo.model');
const tutorialServiceModel = require('../models/tutorialService.model');

class SearchServices {
    static async fetchAllTutorials(school) {
        try {
            // Fetch tutorial videos based on school
            const tutorialVideos = await tutorialVideoModel.find({ school: school });

            // Fetch tutorial services based on school
            const tutorialServices = await tutorialServiceModel.find({ school: school });

            // Combine tutorial videos and services into one array
            const combinedData = [...tutorialVideos, ...tutorialServices];

            // Return the combined data
            return combinedData;
        } catch (error) {
            console.error('Error searching data:', error);
            return null;
        }
    }
}

module.exports = SearchServices;
