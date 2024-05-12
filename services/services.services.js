const tutorialServiceModel = require('../models/tutorialService.model');

class ServicesServices {
    // Fetch all tutorial services for a given school
    static async fetchAllServices(school) {
        try {
            const services = await tutorialServiceModel.find({ school: school });
            return services;
        } catch (error) {
            console.error("Error fetching all tutorial services:", error);
            throw error; // Re-throw the error to be handled by the controller
        }
    }

    // Fetch popular tutorial services for a given school
    static async fetchPopularServices(school) {
        try {
            const popularServices = await tutorialServiceModel
                .find({ school: school })
                .sort({ sales: -1 })
                .limit(5); // Limit the results to top 5 services
            return popularServices;
        } catch (error) {
            console.error("Error fetching popular tutorial services:", error);
            throw error;
        }
    }

    // Fetch tutorial services by tutor ID
    static async fetchTutorServices(tutorID) {
        try {
            const services = await tutorialServiceModel.find({ tutorID: tutorID });
            return services;
        } catch (error) {
            console.error("Error fetching tutorial services by tutor ID:", error);
            throw error;
        }
    }
}

module.exports = ServicesServices;
