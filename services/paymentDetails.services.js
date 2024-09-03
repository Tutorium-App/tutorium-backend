const paymentDetailsModel = require('../models/paymentDetails.model');
const payTutorDetailsModel = require('../models/payTutorDetails.model');
const payTutorForVideoModel = require('../models/payTutorForVideo.model');

const connection = require('../config/db');

class PaymentDetailsServices {
    //function to store payment details into database
    static async storePaymentDetails(paymentReference, tutorialID, tutorID, tutorName, tutorEmail, studentID, studentName, studentNumber, studentEmail, tutorNumber, tutorialTitle, amount, category, imageURL, requestID, isRequest) {
        const paymentDetail = new paymentDetailsModel({ paymentReference, tutorialID, tutorID, tutorName, tutorEmail, studentID, studentName, studentNumber, studentEmail, tutorNumber, tutorialTitle, amount, category, imageURL, requestID, isRequest });
        return await paymentDetail.save();
    }

    static async storePayTutorDetails(reference, recipientCode, tutorialID, tutorID, tutorName, tutorEmail, studentID, tutorNumber, title, amount, category) {
        const payTutorDetail = new payTutorDetailsModel({reference, recipientCode, tutorialID, tutorID, tutorName, tutorEmail, studentID, tutorNumber, title, amount, category});
        return await payTutorDetail.save();
    }

    static async storePayTutorForVideoDetails(reference, recipientCode, tutorName, tutorNumber, newAmount){
        const payTutorForVideo = new payTutorForVideoModel({reference, recipientCode, tutorName, tutorNumber, newAmount});
        return await payTutorForVideo.save();
    }
}

module.exports = PaymentDetailsServices;

