const PendingTutorialServices = require('../services/pendingTutorials.services');
const tutorialServiceModel = require('../models/tutorialService.model');
const paymentDetailsModel = require('../models/paymentDetails.model');
const tutorialVideoModel = require('../models/tutorialVideo.model');
const tutorModel = require('../models/tutor.model');
const studentModel = require('../models/student.model');
const { alertTutorService } = require('../utils/alertTutorOfNewTutorialService');
const { alertTutorVideo } = require('../utils/alertTutorOfNewTutorialVideo');
const { generateRandomCode } = require('../utils/qrCodeGenerator');
const BoughtVideoServices = require('../services/boughtVideo.services');
const PaymentServices = require('../services/payment.services');

const crypto = require('crypto');

// Controller function to handle Paystack webhook callback
exports.handlePaystackCallback = async (req, res) => {
    try {
        // Extract the payload from the request body
        const payload = req.body;

        // Verify the authenticity of the webhook request
        const paystackSignature = req.headers['x-paystack-signature'];
        const secretKey = process.env.secretKey;

        const hash = crypto.createHmac('sha512', secretKey).update(JSON.stringify(payload)).digest('hex');
        if (hash !== paystackSignature) {
            console.error('Invalid Paystack signature');
            return res.status(401).send('Invalid Paystack signature');
        }

        // Proceed to handle the webhook event based on its type
        const event = payload.event;
        switch (event) {
            case 'charge.success':
                // Handle successful payment
                console.log('Payment was successful');

                // Extract the reference from the payload
                const reference = payload.data.reference;

                try {
                    // Query the database for payment details using the reference
                    const paymentDetails = await paymentDetailsModel.findOne({ paymentReference: reference });

                    // Now you have the payment details, you can perform the necessary operations
                    if (paymentDetails) {
                        // Perform operations based on payment details
                        // console.log('Payment details:', paymentDetails);

                        try {
                            const service = await tutorialServiceModel.findById(paymentDetails.tutorialID);
                            if (service) {
                                service.sales++;
                                await service.save();
                                const tutor = await tutorModel.findOne({ tutorID: paymentDetails.tutorID });
                                tutor.sales++;
                                tutor.balance += paymentDetails.amount;
                                await tutor.save();
                                alertTutorService(paymentDetails.tutorName, paymentDetails.tutorEmail, paymentDetails.studentName, paymentDetails.studentEmail, paymentDetails.studentNumber, paymentDetails.tutorialTitle, paymentDetails.amount);
                                const qrCode = generateRandomCode(paymentDetails.tutorialID);
                                const pendingTutorial = await PendingTutorialServices.createPendingTutorial(paymentDetails.tutorID, paymentDetails.studentID, paymentDetails.tutorName, paymentDetails.studentName, paymentDetails.studentEmail, paymentDetails.tutorEmail, paymentDetails.tutorialTitle, paymentDetails.amount, qrCode, paymentDetails.tutorNumber, paymentDetails.studentNumber);
                            } else {
                                const video = await tutorialVideoModel.findById(paymentDetails.tutorialID);
                                if (video) {
                                    const payTutor = PaymentServices.payTutorForVideo(paymentDetails.amount, paymentDetails.tutorNumber, paymentDetails.tutorEmail);
                                    video.sales++;
                                    await video.save();
                                    const tutor = await tutorModel.findOne({ tutorID: paymentDetails.tutorID });
                                    tutor.sales++;
                                    await tutor.save();
                                    const student = await studentModel.findOne({ studentID: paymentDetails.studentID });
                                    student.numberOfVideos++;
                                    await student.save();
                                    alertTutorVideo(paymentDetails.tutorName, paymentDetails.tutorEmail, paymentDetails.tutorialTitle, paymentDetails.amount);
                                    const boughtVideo = await BoughtVideoServices.createBoughtVideo(paymentDetails.tutorID, paymentDetails.tutorName, paymentDetails.tutorEmail, paymentDetails.tutorNumber, paymentDetails.tutorialTitle, video.category, video.description, video.dateCreated, video.school, video.cost, video.thumbnailLink, video.videoLink);
                                }
                            }
                        } catch (err) {
                            console.error('Error handling successful payment:', err);
                            return res.status(500).send('Error handling successful payment');
                        }

                        // Delete the payment detail record from the database after using its data
                        await paymentDetailsModel.deleteOne({ paymentReference: reference });
                    } else {
                        console.error('Payment details not found');
                        return res.status(404).send('Payment details not found');
                    }

                    return res.status(200).send('Payment successful');
                } catch (error) {
                    console.error('Error handling successful payment:', error);
                    return res.status(500).send('Error handling successful payment');
                }

            case 'charge.failure':
                // Handle failed payment
                console.log('Payment failed');
                // Additional logic: Log the failure, notify the user, retry payment, etc.
                return res.status(500).send('Payment failed');

            default:
                // Unsupported event type
                console.log(`Unsupported event type: ${event}`);
                break;
        }

        // Respond with a 200 OK status to acknowledge receipt of the webhook
        res.status(200).send('Webhook received successfully');
    } catch (error) {
        console.error('Error handling webhook:', error);
        // Respond with an error status if an exception occurs
        res.status(500).send('Error handling webhook');
    }
};
