const tutorialRequestModel = require('../models/tutorialRequest.model');
const acceptedTutorialRequestModel = require('../models/acceptedRequests.model');

class TutorialRequestServices {
    // Fetch all tutorial requests by school
    static async fetchAcceptedRequests(studentID) {
        try {
            const acceptedRequests = await acceptedTutorialRequestModel.find({ studentID: studentID }).exec();
            return acceptedRequests.length > 0 ? acceptedRequests : null;
        } catch (error) {
            console.error('Error fetching tutorial requests:', error);
            return null;
        }
    }

    static async deleteTutorialRequest(studentRequestID) {
        try {
            // Delete the request inside tutorialRequestModel by studentRequestID
            const deletedRequest = await tutorialRequestModel.findByIdAndDelete(studentRequestID).exec();
            if (!deletedRequest) {
                return null;
            }

            // Delete any accepted request inside acceptedTutorialRequestModel using studentRequestID
            await acceptedTutorialRequestModel.deleteMany({ studentRequestID: studentRequestID }).exec();

            return true;

        } catch (error) {
            console.error('Error deleteing tutorial request:', error);
            return null;
        }
    }


    static async createRequest(studentID, studentName, studentEmail, role, requestType, description, budget, validUntil, amount, school) {
        try {
            // Create a new tutorial request
            const newRequest = new tutorialRequestModel({
                studentID,
                studentName,
                studentEmail,
                role,
                requestType,
                description,
                budget,
                validUntil,
                amount,
                school
            });

            // Save the new request to the database
            await newRequest.save();

            return newRequest;
        } catch (error) {
            console.error('Error creating tutorial request:', error);
            return null;
        }
    }
}

module.exports = TutorialRequestServices;
