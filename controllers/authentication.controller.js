const AuthenticationServices = require('../services/authentication.services');
const EmailServices = require('../services/email.services');
const { sendErrorResponse } = require('../utils/errorHandler');

// Function to get tutor authentication data and store it
exports.storeTutorData = async (req, res, next) => {
    try {
        const { tutorID, fullName, email, phone, dateCreated, school, program, year, profilePhotoLink } = req.body;
        
        // Attempt to store tutor data
        let tutorData = await AuthenticationServices.storeTutorData(tutorID, fullName, email, phone, dateCreated, school, program, year, profilePhotoLink);

        // Check if data was stored successfully
        if (!tutorData) {
            return sendErrorResponse(res, 500, 'Error saving tutor details');
        }

        // Define the congratulations email content
        const message = `Dear ${fullName},\n\n
        Congratulations on joining Tutorium! We're thrilled to have you aboard our community of passionate and dedicated tutors. At Tutorium, we believe in the power of education and the difference it can make in a student's life. As a tutor on our platform, you'll have the opportunity to share your knowledge, connect with fellow students, and earn money while you do it.\n\n
        We're committed to providing you with all the support you need to succeed. We look forward to seeing the impact you'll make. If you have any questions or need assistance, feel free to reach out to our support team.\n\n
        Welcome to Tutorium, where learning meets passion and opportunity.\n\n
        Warm regards,\n
        The Tutorium Team`;

        const subject = "Congratulations! You're a Tutorium Tutor";

        // Attempt to send the email
        let tutorEmail = await EmailServices.sendEmail(email, fullName, subject, message);

        // Handle email send failure
        if (!tutorEmail) {
            return sendErrorResponse(res, 500, 'Error sending email');
        }

        // Send successful response
        res.json({ status: true, success: tutorData });

    } catch (error) {
        next(error); // Pass any exceptions to the next error handling middleware
    }
}

// function to delete account using tutor id
exports.deleteAccount = async (req, res, next)=>{
    try {
        const {tutorID} = req.body;
        
        let tutorData = await AuthenticationServices.deleteAccount(tutorID);

        if (!tutorData) {
            return sendErrorResponse(res, 500, 'Error deleting tutor account');
        }

        res.json({status: true, success: tutorData});
    } catch (error) {
        next(error);
    }
}

