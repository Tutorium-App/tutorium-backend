const EmailServices = require('../services/email.services');
const { sendErrorResponse } = require('../utils/errorHandler');

async function alertTutorService(tutorName, tutorEmail, studentName, studentEmail, studentNumber, tutorialTitle, amount) {
    
    const message = `Dear ${tutorName},\n\n
    We are happy to inform you that your tutorial service titled: "${tutorialTitle}" has been booked by a student from your campus at GHS${amount}.\n\n
    This amount will be processed and transfered into your Mobile Money account after the completion of this service. Have in mind that service fees would be deducted. \n\n
    \n\n
    Student Details\n\
    Name: ${studentName}\n
    Phone Number: ${studentNumber}\n
    Email: ${studentEmail}\n\n
    Contact the student to plan ahead for the tutorial service. If you have any questions or need support, our customer service team is always ready to help.\n\n
    Best wishes,\n
    The Tutorium Team`;

    const subject = "Tutorial Service Booked!";

    // Attempt to send the email
    let Email = await EmailServices.sendEmail(tutorEmail, tutorName, subject, message);

    // Handle email send failure
    if (!Email) {
        return sendErrorResponse(res, 500, 'Error sending email');
    }

}

module.exports = { alertTutorService };