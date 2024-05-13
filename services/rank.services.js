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

            // Convert position to string with appropriate suffix (e.g., "1st", "2nd", "3rd")
            const positionString = getPositionString(position);

            return positionString;
        } catch (error) {
            console.error("Error retrieving tutor's rank:", error);
            throw error; // Re-throw the error to be handled by the controller
        }
    }
}

// Helper function to get position suffix
function getPositionString(position) {
    const lastDigit = position % 10;
    const lastTwoDigits = position % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
        return position + "st";
    } else if (lastDigit === 2 && lastTwoDigits !== 12) {
        return position + "nd";
    } else if (lastDigit === 3 && lastTwoDigits !== 13) {
        return position + "rd";
    } else {
        return position + "th";
    }
}

module.exports = RankServices;
