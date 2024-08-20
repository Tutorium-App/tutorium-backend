const TutorialRequestServices = require('../services/tutorialRequest.services');
const { sendErrorResponse } = require('../utils/errorHandler');

// Function to fetch accepted tutorial requests by student ID
exports.fetchAcceptedRequests = async (req, res, next) => {
    try {
        const { studentID } = req.query;

        const acceptedRequests = await TutorialRequestServices.fetchAcceptedRequests(studentID);
        // console.log(acceptedRequests);

        if (!acceptedRequests) {
            return sendErrorResponse(res, 500, 'Error fetching tutorial requests');
        }

        res.json({ status: true, success: acceptedRequests });
    } catch (error) {
        next(error);
    }
};

// Function to accept tutorial request
exports.acceptTutorialRequest = async (req, res, next) => {
    try {
        const {
            studentRequestID,
            studentID,
            tutorID,
            studentName,
            tutor,
            role,
            requestType,
            description,
            budget,
            amount
        } = req.body;

        const acceptedRequest = await TutorialRequestServices.acceptTutorialRequest(
            studentRequestID,
            studentID,
            tutorID,
            studentName,
            tutor,
            role,
            requestType,
            description,
            budget,
            amount
        );

        if (!acceptedRequest) {
            return sendErrorResponse(res, 500, 'Error accepting tutorial request');
        }

        res.json({ status: true, success: acceptedRequest });
    } catch (error) {
        next(error);
    }
};

// Function to create a new tutorial request
exports.createRequest = async (req, res, next) => {
    try {
        const {
            studentID,
            studentName,
            studentEmail,
            role,
            requestType,
            description,
            budget,
            validUntil,
            amount,
            school
        } = req.body;

        const newRequest = await TutorialRequestServices.createRequest(
            studentID,
            studentName,
            studentEmail,
            role,
            requestType,
            description,
            budget,
            validUntil,
            amount,
            school
        );

        if (!newRequest) {
            return sendErrorResponse(res, 500, 'Error creating tutorial request');
        }

        res.json({ status: true, success: newRequest });
    } catch (error) {
        next(error);
    }
};
