const TutorialRequestServices = require('../services/tutorialRequest.services');
const { sendErrorResponse } = require('../utils/errorHandler');

// Function to fetch all tutorial requests by school
exports.readTutorialRequests = async (req, res, next) => {
    try {
        const { school } = req.body;

        const tutorialRequests = await TutorialRequestServices.readTutorialRequests(school);

        if (!tutorialRequests) {
            return sendErrorResponse(res, 500, 'Error fetching tutorial requests');
        }

        res.json({ status: true, success: tutorialRequests });
    } catch (error) {
        next(error);
    }
};

// Function to accept a tutorial request
exports.acceptTutorialRequest = async (req, res, next) => {
    try {
        const { studentRequestID, studentID, tutorID, studentName, tutor, role, requestType, description, budget, amount } = req.body; 

        const tutorialRequests = await TutorialRequestServices.acceptTutorialRequest(studentRequestID, studentID, tutorID, studentName, tutor, role, requestType, description, budget, amount);

        if (!tutorialRequests) {
            return sendErrorResponse(res, 500, 'Error accepting tutorial requests');
        }

        res.json({ status: true, success: tutorialRequests });
    } catch (error) {
        next(error);
    }
};

