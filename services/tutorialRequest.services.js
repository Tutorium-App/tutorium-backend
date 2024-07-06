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

    static async acceptTutorialRequest(studentRequestID, studentID, tutorID, studentName, tutor, role, requestType, description, budget, amount) {
        try {
            // Delete the request inside tutorialRequestModel by studentRequestID
            await tutorialRequestModel.findByIdAndDelete(studentRequestID).exec();

            // Delete any accepted request inside acceptedTutorialRequestModel using studentRequestID
            await acceptedTutorialRequestModel.deleteMany({ studentRequestID: studentRequestID }).exec();

            // Create a new accepted request
            const acceptRequest = new acceptedTutorialRequestModel({
                studentRequestID,
                studentID,
                tutorID,
                studentName,
                tutor,
                role,
                requestType,
                description,
                budget,
                amount
            });

            // Save the accepted request to the database
            await acceptRequest.save();

            // Send student email if tutorial request is accepted
            if (acceptRequest) {
                const message = `Dear ${tutor},\n
                Good news! ${studentName} has accepted to book your service for the role: "${role}"
                After the service is paid for, we'll notify you so that you arrange a tutorial service with your student.
                If you have any questions, please don't hesitate to reach out. We are here to support you every step of the way.
                Thank you for using Tutorium.\n
                Warm regards,
                The Tutorium Team \n
                [Customer service email: tutorium.customer@gmail.com. Email us here.]`;

                const subject = "Your Tutorial Service has been Accepted!";

                // Assuming sendEmail is a function within your EmailServices class
                let emailStatus = await EmailServices.sendEmail(studentEmail, subject, message);

                if (!emailStatus) {
                    console.error('Error sending confirmation email');
                    return null; // Adjust handling based on your error strategy
                }
            }

            return acceptRequest;
        } catch (error) {
            console.error('Error accepting tutorial request:', error);
            return null;
        }
    }

    static async createRequest(studentID, studentName, studentEmail, role, requestType, description, budget, validUntil, amount) {
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
                amount
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
