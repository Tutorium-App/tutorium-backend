const tutorialRequestModel = require('../models/tutorialRequest.model');
const acceptedTutorialRequestModel = require('../models/acceptedRequests.model');
const EmailServices = require('../services/email.services');

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

    static async acceptTutorialRequest(studentRequestID) {
        try {
            // Delete the request inside tutorialRequestModel by studentRequestID
            await tutorialRequestModel.findByIdAndDelete(studentRequestID).exec();

            // Delete any accepted request inside acceptedTutorialRequestModel using studentRequestID
            await acceptedTutorialRequestModel.deleteMany({ studentRequestID: studentRequestID }).exec();

        } catch (error) {
            console.error('Error accepting tutorial request:', error);
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
