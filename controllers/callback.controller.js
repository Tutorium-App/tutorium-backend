const PendingTutorialServices = require('../services/pendingTutorials.services');
const tutorialServiceModel = require('../models/tutorialService.model');
const tutorialVideoModel = require('../models/tutorialVideo.model');
const tutorModel = require('../models/tutor.model');
const { alertTutorService } = require('../utils/alertTutorOfNewTutorialService');
const { alertTutorVideo } = require('../utils/alertTutorOfNewTutorialVideo');
const { generateRandomCode } = require('../utils/qrCodeGenerator');
const BoughtVideoServices = require('./boughtVideo.services');


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
                try {
                    const service = await tutorialServiceModel.findById(tutorialID);
                    if (service) {
                        service.sales++;
                        await service.save();
                        const tutor = await tutorModel.findOne({ tutorID: tutorID });
                        tutor.sales++;
                        await tutor.save();
                        alertTutorService(tutorName, tutorEmail, studentName, studentEmail, studentNumber, tutorialTitle, amount);
                        const qrCode = generateRandomCode(tutorialID);
                        const pendingTutorial = await PendingTutorialServices.createPendingTutorial(tutorID, studentID, tutorName, studentName, studentEmail, tutorEmail, tutorialTitle, amount, qrCode, tutorNumber, studentNumber);
                    } else {
                        const video = await tutorialVideoModel.findById(tutorialID);
                        if (video) {
                            payTutorForVideo(amount, tutorNumber, tutorEmail);
                            video.sales++;
                            await video.save();
                            const tutor = await tutorModel.findOne({ tutorID: tutorID });
                            tutor.sales++;
                            await tutor.save();
                            const student = await studentModel.findOne({ studentID: studentID });
                            student.numberOfVideos++;
                            await student.save();
                            alertTutorVideo(tutorName, tutorEmail, tutorialTitle, amount);
                            const boughtVideo = await BoughtVideoServices.createBoughtVideo(tutorID, tutorName, tutorEmail, tutorNumber, tutorialTitle, video.category, video.description, video.dateCreated, video.school, video.cost, video.thumbnailLink, video.videoLink);
                        }
                    }
                    resolve(body);
                } catch (err) {
                    reject(err);
                }
                return res.status(200).send('Payment successful');
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
