const PendingTutorialServices = require('../services/pendingTutorials.services');
const { sendErrorResponse } = require('../utils/errorHandler');


// Function to fetch all pending tutorials from the database
exports.fetchPendingTutorials = async (req, res, next) => {
    try {
        const { studentID } = req.body;

        const data = await PendingTutorialServices.fetchPendingTutorials(studentID);

        if (!data) {
            return sendErrorResponse(res, 500, 'Error fetching pending tutorial');
        }

        res.json({ status: true, success: data });
    } catch (error) {
        next(error);
    }  
}; 

// Function to create a pending tutorial service
exports.createPendingTutorial = async (req, res, next) => {
    try {
        const { tutorID, studentID, tutorName, studentName, studentEmail, tutorEmail, tutorialTitle, cost, qrCode, tutorNumber, studentNumber, imageURL } = req.body;

        const data = await PendingTutorialServices.createPendingTutorial(tutorID, studentID, tutorName, studentName, studentEmail, tutorEmail, tutorialTitle, cost, qrCode, tutorNumber, studentNumber, imageURL);

        if (!data) {
            return sendErrorResponse(res, 500, 'Error createing pending tutorial');
        }

        res.json({ status: true, success: data });
    } catch (error) {
        next(error);
    } 
}; 

// Function to request a refund
exports.requestRefund = async (req, res, next) => {
    try {
        const { tutorialID, tutorName, studentName, studentEmail, tutorEmail, tutorialTitle, cost, tutorNumber, studentNumber, reason, activeNumber } = req.body;

        const data = await PendingTutorialServices.requestRefund(tutorialID, tutorName, studentName, studentEmail, tutorEmail, tutorialTitle, cost, tutorNumber, studentNumber, reason, activeNumber);

        if (!data) {
            return sendErrorResponse(res, 500, 'Error sending refund request');
        }

        res.json({ status: true, success: data });
    } catch (error) {
        next(error);
    } 
};


// Function to request a refund
exports.approveRefund = async (req, res, next) => {
    try {
        const { tutorID, tutorialID, tutorName, studentName, studentEmail, tutorEmail, tutorialTitle, cost, tutorNumber, studentNumber, reason, activeNumber } = req.body;

        const data = await PendingTutorialServices.approveRefund(tutorID, tutorialID, tutorName, studentName, studentEmail, tutorEmail, tutorialTitle, cost, tutorNumber, studentNumber, reason, activeNumber);

        if (!data) {
            return sendErrorResponse(res, 500, 'Error approving refund request');
        }

        res.json({ status: true, success: data });
    } catch (error) {
        next(error);
    } 
};  //todo: gonna come back to this, for the payment reasons