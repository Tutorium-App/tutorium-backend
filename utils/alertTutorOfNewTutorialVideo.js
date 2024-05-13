const EmailServices = require('../services/email.services');
const { sendErrorResponse } = require('../utils/errorHandler');

async function alertTutorVideo(tutorName, tutorEmail, tutorialTitle, amount) {
    
    const message = `Dear ${tutorName},\n\n
    We are happy to inform you that your tutorial video titled: "${tutorialTitle}" has been purchased by a student from your campus at GHS${amount}.\n\n
    This amount will be processed and transfered into your Mobile Money account. Have in mind that service fees would be deducted. If you have any questions or need support, our customer service team is always ready to help.\n\n
    Thank you for choosing Tutorium. We are excited to be a part of your educational journey and look forward to helping you reach your full potential.\n\n
    Best wishes,\n
    The Tutorium Team`;

    const subject = "New Tutorial Video Purchase!";

    // Attempt to send the email
    let Email = await EmailServices.sendEmail(tutorEmail, tutorName, subject, message);

    // Handle email send failure
    if (!Email) {
        return sendErrorResponse(res, 500, 'Error sending email');
    }

}

module.exports = { alertTutorVideo };