const PaymentServices = require('../services/payment.services');
const { sendErrorResponse } = require('../utils/errorHandler');


// Function to fetch all pending payments from the database
exports.fetchPayments = async (req, res, next) => {
    try {
        const { studentID } = req.body;

        const payments = await PaymentServices.fetchPayments(studentID);

        if (!payments) {
            return sendErrorResponse(res, 500, 'Error fetching payment details');
        }

        res.json({ status: true, success: payments });
    } catch (error) {
        next(error);
    } 
}; 

// Function to make payment to the Tutorium account
exports.makePayment = async (req, res, next) => {
    try {
        const { tutorialID, tutorID, tutorName, tutorEmail, tutorNumber, tutorialTitle, amount, studentID, studentName, studentNumber, studentEmail } = req.body;
        const paymentData = {
            tutorialID: tutorialID,
            tutorID: tutorID,
            tutorName: tutorName,
            tutorEmail: tutorEmail,
            tutorNumber: tutorNumber,
            tutorialTitle: tutorialTitle,
            amount: amount,
            studentID: studentID,
            studentName: studentName,
            studentNumber: studentNumber,
            studentEmail: studentEmail
        };

        const payment = await PaymentServices.makePayment(paymentData);

        if (!payment) {
            return sendErrorResponse(res, 500, 'Error making payment');
        }

        res.json({ status: true, success: payment });
    } catch (error) {
        next(error);
    } 
}; 

// Function to pay tutor
exports.payTutor = async (req, res, next) => {
    try {
        const { tutorID, tutorName, title, category, amount, tutorNumber, tutorEmail, studentID } = req.body;

        const payment = await PaymentServices.payTutor(tutorID, tutorName, title, category, amount, tutorNumber, tutorEmail, studentID);

        if (!payment) {
            return sendErrorResponse(res, 500, 'Error making payment');
        }

        res.json({ status: true, success: payment });
    } catch (error) {
        next(error);
    } 
}; 

 