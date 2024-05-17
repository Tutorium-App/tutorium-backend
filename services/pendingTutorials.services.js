const pendingTutorialModel = require('../models/pendingTutorials.model');

class PendingTutorialServices {

    //function to create new pending tutorial service
    static async createPendingTutorial(tutorID, studentID, tutorName, studentName, studentEmail, tutorEmail, tutorialTitle, cost, qrCode, tutorNumber, studentNumber) {

        const pendingTutorial = new pendingTutorialModel({ tutorID, studentID, tutorName, studentName, studentEmail, tutorEmail, tutorialTitle, cost, qrCode, tutorNumber, studentNumber });
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
            Dear Tutorium Admin,\n\n
            A refund has been requested by a student for the following tutorial:\n
            Tutorial Title: ${tutorialTitle}\n
            Tutorial ID: ${tutorialID}\n
            Cost: ${cost}\n
            Student Details:\n
            Name: ${studentName}\n
            Email: ${studentEmail}\n
            Number: ${studentNumber}\n
            Active Number: ${activeNumber}\n
            Reason: ${reason}\n
            Tutor Details:\n
            Name: ${tutorName}\n
            Email: ${tutorEmail}\n
            Number: ${tutorNumber}\n\n
            Please review this refund request and take appropriate action.\n\n
            Best regards,\n
            The Tutorium Team \n\n
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
    static async approveRefund(tutorialID, tutorName, tutorEmail, tutorialTitle) {
        try {
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

