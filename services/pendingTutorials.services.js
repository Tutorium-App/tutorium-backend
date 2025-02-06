const pendingTutorialModel = require('../models/pendingTutorials.model');
const SMSServices = require('../services/sms.services');
const saveMessage = require('../utils/saveMessage');

class PendingTutorialServices {

    //function to create new pending tutorial service
    static async createPendingTutorial(tutorID, studentID, tutorName, studentName, studentEmail, tutorEmail, tutorialTitle, cost, qrCode, category, tutorNumber, studentNumber, imageURL) {

        const pendingTutorial = new pendingTutorialModel({ tutorID, studentID, tutorName, studentName, studentEmail, tutorEmail, tutorialTitle, cost, qrCode, category, tutorNumber, studentNumber, imageURL });
        return await pendingTutorial.save();
    }

    // fetch all pending tutorial service
    static async fetchPendingTutorials(studentID) {
        try {
            const data = await pendingTutorialModel.find({ studentID: studentID });
            return data;
        } catch (error) {
            console.error("Error retrieving pending tutorial services from database:", error);
            throw error; // Re-throw the error to be handled by the controller
        }
    }

    // function to send an email to admin for a refund
    static async requestRefund(tutorialID, tutorName, studentName, studentEmail, tutorEmail, tutorialTitle, cost, tutorNumber, studentNumber, reason, activeNumber) {
        try {

            let message = 
            `Dear Tutorium Admin,

            A refund has been requested by a student for the following tutorial:
            Tutorial Title: ${tutorialTitle}
            Tutorial ID: ${tutorialID}
            Cost: ${cost}
            Student Details:
            Name: ${studentName}
            Email: ${studentEmail}
            Number: ${studentNumber}
            Active Number: ${activeNumber}
            Reason: ${reason}
            Tutor Details:
            Name: ${tutorName}
            Email: ${tutorEmail}
            Number: ${tutorNumber}

            Please review this refund request and take appropriate action.

            Best regards,
            The Tutorium Team 

            [Customer service email: tutorium.customer@gmail.com. Email us here.]`;

            const SMS = await saveMessage(message);
            // Send SMS to admin
            const smsMessage = `Hi admin, review this refund request: ${SMS}`;
            let requestRefundSMS = await SMSServices.sendSMS("0256772900", smsMessage);

            // Handle sms send failure
            if (!requestRefundSMS) {
                return sendErrorResponse(res, 500, 'Error sending SMS');
            }

        } catch (error) {
            console.error("Error requesting refund:", error);
            throw error; // Re-throw the error to be handled by the controller
        }
    }

    // function to approve refund
    static async approveRefund(tutorID, tutorialID, tutorName, tutorEmail, tutorialTitle) {
        try {
            const tutor = await tutorModel.findOne({ tutorID: tutorID });
            tutor.balance -= amount;
            await tutor.save();

            let message = 
            `Dear ${tutorName},

            We regret to inform you that the tutorial service "${tutorialTitle}" booked by a student has been cancelled due to a refund request by the student.
            If you have any questions or concerns, please feel free to contact us.

            Best regards,
            Tutorium Team
            
            [Customer service email: tutorium.customer@gmail.com. Email us here.]`;

            const SMS = await saveMessage(message);
            // Send SMS to tutor
            const smsMessage = `Hi tutor, review this refund request: ${SMS}`;
            let requestRefundSMS = await SMSServices.sendSMS(tutor.phone, smsMessage);

            // Handle sms send failure
            if (!requestRefundSMS) {
                return sendErrorResponse(res, 500, 'Error sending SMS');
            }

            // Delete pendingTutorial by its ID
            await pendingTutorialModel.findByIdAndDelete(tutorialID);

            // Email sent successfully
            console.log("Cancellation email sent to tutor successfully.");
        } catch (error) {
            console.error('Error sending cancellation email:', error);
            throw error;
        }
    }

    //function to delete pending tutorial service
    static async deletePendingTutorial(tutorialID) {
        try {
            const pendingTutorialDocument = await pendingTutorialModel.findByIdAndDelete(tutorialID);
            return !!pendingTutorialDocument; // Return true if deleted, false otherwise
        } catch (error) {
            console.error('Error deleting pending tutorial:', error);
            // Handle different error types here (optional)
            throw error;
        }
    }
}

module.exports = PendingTutorialServices;

