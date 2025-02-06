const SMSServices = require('../services/sms.services');
const saveMessage = require('../utils/saveMessage');

async function alertTutorVideo(tutorNumber, tutorName, tutorialTitle, amount) {
    
    const message = `Dear ${tutorName},\n
    We are happy to inform you that your tutorial video titled: "${tutorialTitle}" has been purchased by a student from your campus at GHS${amount}.
    This amount will be processed and transfered into your Mobile Money account. Have in mind that service fees would be deducted. If you have any questions or need support, our customer service team is always ready to help.
    Thank you for choosing Tutorium. We are excited to be a part of your educational journey and look forward to helping you reach your full potential.\n
    Best wishes,
    The Tutorium Team \n
    [Customer service email: tutorium.customer@gmail.com. Email us here.]`;

    const SMS = await saveMessage(message);
    // Send SMS to admin
    const smsMessage = `Hi tutor, a student bought your tutorial video. Review the details here: ${SMS}`;
    let bookServiceSMS = await SMSServices.sendSMS(tutorNumber, smsMessage);

    // Handle sms send failure
    if (!bookServiceSMS) {
        console.log('Error sending SMS');
    }

}

module.exports = { alertTutorVideo };