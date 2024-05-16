const paymentDetailsModel = require('../models/paymentDetails.model');

const connection = require('../config/db');

class PaymentDetailsServices {
    //function to store payment details into database
    static async storePaymentDetails(paymentReference, tutorialID, tutorID, tutorName, tutorEmail, studentID, studentName, studentNumber, studentEmail, tutorNumber, tutorialTitle, amount) {


        const paymentDetail = new paymentDetailsModel({ paymentReference, tutorialID, tutorID, tutorName, tutorEmail, studentID, studentName, studentNumber, studentEmail, tutorNumber, tutorialTitle, amount });
        return await paymentDetail.save();
    }
}

module.exports = PaymentDetailsServices;

