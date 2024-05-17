const EmailServices = require('../services/email.services');
const { sendErrorResponse } = require('../utils/errorHandler');

async function alertTutorService(tutorName, tutorEmail, studentName, studentEmail, studentNumber, tutorialTitle, amount) {
    
    const message = `Dear ${tutorName},\n
    We are happy to inform you that your tutorial service titled: "${tutorialTitle}" has been booked by a student from your campus at GHS${amount}.
    This amount will be processed and transfered into your Mobile Money account after the completion of this service. Have in mind that service fees would be deducted. \n
    Student Details
    Name: ${studentName}
    Phone Number: ${studentNumber}
    Email: ${studentEmail}\n
    Contact the student to plan ahead for the tutorial service. If you have any questions or need support, our customer service team is always ready to help.\n
    Best wishes,
    The Tutorium Team \n
    [Customer service email: tutorium.customer@gmail.com. Email us here.]`;

    const subject = "Tutorial Service Booked!";

    // Attempt to send the email
    let Email = await EmailServices.sendEmail(tutorEmail, tutorName, subject, message);

    // Handle email send failure
    if (!Email) {
        return sendErrorResponse(res, 500, 'Error sending email');
    }

}

module.exports = { alertTutorService };