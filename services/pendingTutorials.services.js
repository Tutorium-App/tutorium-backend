const pendingTutorialModel = require('../models/pendingTutorials.model');
const EmailServices = require('../services/email.services');

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

            const message = `
            Dear Tutorium Admin,\n
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
            Number: ${tutorNumber}\n
            Please review this refund request and take appropriate action.\n
            Best regards,
            The Tutorium Team \n
            [Customer service email: tutorium.customer@gmail.com. Email us here.]`;

            const subject = `Refund Request: ${tutorialTitle}`;
            const email = "buabassahlawson01@gmail.com"; //todo: admin email goes here
            const name = "Tutorium Admin"

            // Attempt to send the email
            let requestRefundMail = await EmailServices.sendEmail(email, name, subject, message);

            // Handle email send failure
            if (!requestRefundMail) {
                return sendErrorResponse(res, 500, 'Error sending email');
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

            const message = `
            Dear ${tutorName},\n\n
            We regret to inform you that the tutorial service "${tutorialTitle}" has been cancelled due to a refund request by the student.\n
            If you have any questions or concerns, please feel free to contact us.\n\n
            Best regards,\n
            Tutorium Team`;

            const subject = `Tutorial Service Cancellation: ${tutorialTitle}`;

            // Attempt to send the email
            await EmailServices.sendEmail(tutorEmail, tutorName, subject, message);

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

