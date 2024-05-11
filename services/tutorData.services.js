const tutorModel = require('../models/tutor.model');

class TutorServices {
    // Fetch tutor data by tutor ID
    static async tutorData(tutorID) {
        try {
            const tutor = await tutorModel.findOne({ tutorID: tutorID });
            if (!tutor) {
                return null; // Return null if no tutor is found to allow controller to handle this case
            }
            return tutor;
        } catch (error) {
            console.error("Error fetching tutor data:", error);
            throw error; // Re-throw the error to be handled by the controller
        }
    }
}

module.exports = TutorServices;
