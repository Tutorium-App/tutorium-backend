const AuthenticationServices = require('../services/authentication.services');
const EmailServices = require('../services/email.services');
const { sendErrorResponse } = require('../utils/errorHandler');

// Function to store students data
exports.storeStudentData = async (req, res, next) => {
    try {
        const { studentID, fullName, email, phone, dateCreated, school, program, year, profilePhotoLink } = req.body;
        
        // Attempt to store student data
        let studentData = await AuthenticationServices.storeStudentData(studentID, fullName, email, phone, dateCreated, school, program, year, profilePhotoLink);

        // Check if data was stored successfully
        if (!studentData) {
            return sendErrorResponse(res, 500, 'Error saving student details');
        }

        // Define the congratulations email content 
        const message = `Dear ${fullName},\n\n
        Welcome to Tutorium! We are delighted to have you join our vibrant community of learners and educators. At Tutorium, we are dedicated to empowering students like you to achieve academic excellence and personal growth through our tailored tutoring services.\n\n
        As a member of Tutorium, you will have access to a wide range of resources and experienced tutors to help you succeed in your studies. Whether you need help with specific courses, preparing for tests or exams, or even learning a new skill, our tutors are here to assist you every step of the way.\n\n
        Feel free to explore our platform and take advantage of the various tools and features available to enhance your learning experience. If you have any questions or need support, our customer service team is always ready to help.\n\n
        Thank you for choosing Tutorium. We are excited to be a part of your educational journey and look forward to helping you reach your full potential.\n\n
        Best wishes,\n
        The Tutorium Team`;

        const subject = "Welcome to Tutorium!!!";

        // Attempt to send the email
        let studentEmail = await EmailServices.sendEmail(email, fullName, subject, message);

        // Handle email send failure
        if (!studentEmail) {
            return sendErrorResponse(res, 500, 'Error sending email');
        }

        // Send successful response
        res.json({ status: true, success: studentData });

    } catch (error) {
        next(error); // Pass any exceptions to the next error handling middleware
    }
}

// function to delete account using student id
exports.deleteAccount = async (req, res, next)=>{
    try {
        const {studentID} = req.body;
        
        let studentData = await AuthenticationServices.deleteAccount(studentID);

        if (!studentData) {
            return sendErrorResponse(res, 500, 'Error deleting student account');
        }

        res.json({status: true, success: studentData});
    } catch (error) {
        next(error);
    }
}

