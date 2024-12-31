const tutorialVideoModel = require('../models/tutorialVideo.model');
const tutorialServiceModel = require('../models/tutorialService.model');

class SearchServices {
    static async fetchAllTutorials(school) {
        try { 
            // Fetch tutorial videos based on school and where verified is true
            const tutorialVideos = await tutorialVideoModel.find({ school: school, verified: true }, { verified: 0 });

            // Fetch tutorial services based on school and where verified is true
            const tutorialServices = await tutorialServiceModel.find({ school: school, verified: true }, { verified: 0 });

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
