const PendingTutorialServices = require('../services/pedingTutorials.services');
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

// Function to request a refund
exports.requestRefund = async (req, res, next) => {
    try {
        const { requestID, tutorID, tutorName, studentID, studentName, tutorEmail, studentEmail, tutorialTitle, requestReason, cost, tutorNumber, studentNumber } = req.body;

        const data = await PendingTutorialServices.requestRefund(requestID, tutorID, tutorName, studentID, studentName, tutorEmail, studentEmail, tutorialTitle, requestReason, cost, tutorNumber, studentNumber);

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
        const { requestID, tutorID, tutorName, studentID, studentName, tutorEmail, studentEmail, tutorialTitle, requestReason, cost, tutorNumber, studentNumber } = req.body;

        const data = await PendingTutorialServices.approveRefund(requestID, tutorID, tutorName, studentID, studentName, tutorEmail, studentEmail, tutorialTitle, requestReason, cost, tutorNumber, studentNumber);

        if (!data) {
            return sendErrorResponse(res, 500, 'Error approving refund request');
        }

        res.json({ status: true, success: data });
    } catch (error) {
        next(error);
    } 
};  //todo: gonna come back to this, for the payment reasons