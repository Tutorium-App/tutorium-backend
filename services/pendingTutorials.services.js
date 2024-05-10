const pendingTutorialModel = require('../models/pendingTutorial.model');

class PendingTutorialServices {
    // Fetch all pending tutorials for a given student ID
    static async fetchPendingTutorials(studentID) {
        try {
            const tutorials = await pendingTutorialModel.find({ studentID: studentID });
            return tutorials;
        } catch (error) {
            console.error("Error fetching pending tutorials:", error);
            throw error; // Re-throw the error to be handled by the controller
        }
    }

    // Request a refund for a tutorial
    static async requestRefund(requestID, tutorID, tutorName, studentID, studentName, tutorEmail, studentEmail, tutorialTitle, requestReason, cost, tutorNumber, studentNumber) {
        try {
            // Create a new refund request
            const refundRequest = new pendingTutorialModel({
                tutorID, tutorName, studentID, studentName, tutorEmail, studentEmail, tutorialTitle, cost, tutorNumber, studentNumber
            });
            // Add a reason and request ID to handle it separately if needed
            refundRequest.requestReason = requestReason;
            refundRequest.requestID = requestID;

            await refundRequest.save();
            return refundRequest;
        } catch (error) {
            console.error("Error sending refund request:", error);
            throw error;
        }
    }

    // Approve a refund
    static async approveRefund(requestID) {
        try {
            const refundApproval = await pendingTutorialModel.findByIdAndUpdate(
                requestID,
                { approved: true }, // Assuming there is an 'approved' field to track this
                { new: true }
            );
            return refundApproval;
        } catch (error) {
            console.error("Error approving refund request:", error);
            throw error;
        }
    }
}

