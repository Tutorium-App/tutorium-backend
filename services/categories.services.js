const tutorialVideoModel = require('../models/tutorialVideo.model');
const tutorialServiceModel = require('../models/tutorialService.model');

class CategoriesServices {
    // Function to load category data based on school and category type
    static async load(school, categoryType) {
        try {
            // Fetch tutorial videos based on school
            const tutorialVideos = await tutorialVideoModel.find({ school: school, category: categoryType });

            // Fetch tutorial services based on school
            const tutorialServices = await tutorialServiceModel.find({ school: school, category: categoryType });

            // Combine tutorial videos and services into one array
            const combinedData = [...tutorialVideos, ...tutorialServices];

            // console.log(combinedData);

            // Return the combined data
            return combinedData.length > 0 ? combinedData : null;
        } catch (error) {
            console.error('Error searching data:', error);
            return null;
        }
    }
}

module.exports = CategoriesServices;
