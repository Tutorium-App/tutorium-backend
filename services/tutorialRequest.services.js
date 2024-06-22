const tutorialRequestModel = require('../models/tutorialRequest.model');
const acceptedTutorialRequestModel = require('../models/acceptedRequests.model');

// todo: PLEASE NOTE !!! 
// todo: THIS NOTICE IS FOR FUTURE LAWSON
// todo: I ASSUME EVERY CODE IN THIS MODULE IS WRONG. 
// todo: PLEASE REFER TO MY NOTE BELOW FOR HELP
// todo: KEEP THE READTUTORIALREQUESTS() FUNCTION BUT MAKE SURE IT'S FROM THE ACCEPTED REQUEST COLLECTION
// todo: AND FOR THE ACCEPTTUTORIALREQUEST() FUNCTION THIS IS HOW IT SHOULD WORK ...
// todo: WHEN A STUDENT ACCEPTS THE REQUEST, EVERY OTHER ACCEPTED REQUEST WITH THAT PARTICULAR STUDENTREQUESTID SHOULD BE DELETED AND THE MAIN REQUEST THE STUDENT SENT TOO SHOULD BE DELETED
// todo: THEN YOU CAN PROCEED WITH PAYMENT, OR PERHAPS DO PAYMENT BEFORE DELETING THE REQUESTS.


class TutorialRequestServices {
    // Fetch all tutorial requests by school
    static async readTutorialRequests(school) {
        try {
            const tutorialRequests = await tutorialRequestModel.find({ school: school }).exec();
            return tutorialRequests.length > 0 ? tutorialRequests : null;
        } catch (error) {
            console.error('Error fetching tutorial requests:', error);
            return null;
        }
    }

    static async acceptTutorialRequest(studentRequestID, studentID, tutorID, studentName, tutor, role, requestType, description, budget, amount) {
        try {
            // Create a new accepted request
            const newAcceptedRequest = new acceptedTutorialRequestModel({
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
            await newAcceptedRequest.save();

            // Send student email if tutorial request is accepted
            if (newAcceptedRequest) {
                const message = `Dear ${studentName},\n
                Good news! ${tutor} has just accepted your request and is eager to help you with the role: "${role}"
                You can review this tutor's profile on our app. This can help you decide whether the tutor fits your educational needs based on their qualifications, teaching style, and previous reviews from other students.
                Take your time to make an informed decision. Once you are ready, you can confirm your preferred tutor directly through the app.
                If you have any questions or need further assistance in making your choice, please don't hesitate to reach out. We are here to support you every step of the way.
                Thank you for using Tutorium. We are thrilled to be a part of your educational journey!\n
                Warm regards,
                The Tutorium Team \n
                [Customer service email: tutorium.customer@gmail.com. Email us here.]`;

                const subject = "Your Tutorial Request has been Accepted!";

                // Assuming sendEmail is a function within your EmailServices class
                let emailStatus = await EmailServices.sendEmail(studentEmail, subject, message);

                if (!emailStatus) {
                    console.error('Error sending confirmation email');
                    return null; // Adjust handling based on your error strategy
                }
            }

            return newAcceptedRequest;
        } catch (error) {
            console.error('Error accepting tutorial request:', error);
            return null;
        }
    }
}

module.exports = TutorialRequestServices;
