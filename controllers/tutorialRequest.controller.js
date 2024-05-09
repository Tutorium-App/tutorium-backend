const TutorialRequestServices = require('../services/tutorialRequest.services');
const { sendErrorResponse } = require('../utils/errorHandler');

// Function to fetch accepted tutorial requests by student ID
exports.fetchAcceptedRequests = async (req, res, next) => {
    try {
        const { studentID } = req.body;

        const tutorialRequests = await TutorialRequestServices.fetchAcceptedRequests(studentID);

        if (!tutorialRequests) {
            return sendErrorResponse(res, 500, 'Error fetching tutorial requests');
        }

        res.json({ status: true, success: tutorialRequests });
    } catch (error) {
        next(error);
    }
}; 
