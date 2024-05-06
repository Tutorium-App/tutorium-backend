const PaymentServices = require('../services/payment.services');
const { sendErrorResponse } = require('../utils/errorHandler');


// Function to fetch tutors pending payment from the database
exports.fetchPayments = async (req, res, next) => {
    try {
        const { tutorID } = req.body;

        const payments = await PaymentServices.fetchPayments(tutorID);

        if (!payments) {
            return sendErrorResponse(res, 500, 'Error fetching payment details');
        }

        res.json({ status: true, success: payments });
    } catch (error) {
        next(error);
    } 
}; 
