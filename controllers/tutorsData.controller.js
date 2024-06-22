const TutorDataServices = require('../services/tutorData.services');
const { sendErrorResponse } = require('../utils/errorHandler');

// Function to fetch tutor data by ID
exports.tutorData = async (req, res, next) => {
    try {
        const { tutorID } = req.query;

        const tutor = await TutorDataServices.tutorData(tutorID);

        if (!tutor) {
            return sendErrorResponse(res, 500, 'Error fetching tutorial requests');
        }

        res.json({ status: true, success: tutor });
    } catch (error) {
        next(error);
    }
}; 
