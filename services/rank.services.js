const tutorModel = require('../models/tutor.model');

class RankServices {
    // Fetches tutor rank
    static async fetchRank(tutorID, school) {
        try {
            // Fetch all tutors by school
            const tutors = await tutorModel.find({ school });

            // Sort tutors based on sales, rating, and numberOfRatings
            const sortedTutors = tutors.sort((a, b) => {
                if (a.sales !== b.sales) {
                    return b.sales - a.sales; // Sort by sales in descending order
                } else if (a.rating !== b.rating) {
                    return b.rating - a.rating; // Sort by rating in descending order
                } else {
                    return b.numberOfRatings - a.numberOfRatings; // Sort by numberOfRatings in descending order
                }
            });

            // Find the position of the tutor with the given tutorID
            const tutorIndex = sortedTutors.findIndex(tutor => tutor.tutorID === tutorID);

            // Calculate the position (add 1 because array indices start from 0)
            const position = tutorIndex + 1;

            // Return the position as a string
            return position.toString(); // <-- Call toString() here
        } catch (error) {
            console.error("Error retrieving tutor's rank:", error);
            throw error; // Re-throw the error to be handled by the controller
        }
    }
}

module.exports = RankServices;
