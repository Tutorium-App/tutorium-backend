const SMSServices = require('../services/sms.services');
const saveMessage = require('../utils/saveMessage');

async function alertTutorService(tutorNumber, tutorName, studentName, studentEmail, studentNumber, tutorialTitle, amount) {

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

    const SMS = await saveMessage(message);
    // Send SMS to admin
    const smsMessage = `Hi tutor, a student booked your service. Review the details here: ${SMS}`;
    let bookServiceSMS = await SMSServices.sendSMS(tutorNumber, smsMessage);

    // Handle sms send failure
    if (!bookServiceSMS) {
        console.log('Error sending SMS');
    }

}

module.exports = { alertTutorService };