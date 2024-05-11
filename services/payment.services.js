const PendingTutorialServices = require('../services/pendingTutorials.services');
const pendingTutorialsModel = require('../models/pendingTutorials.model');
const tutorialServiceModel = require('../models/tutorialService.model');
const tutorialVideoModel = require('../models/tutorialVideo.model');
const tutorModel = require('../models/tutor.model');
const studentModel = require('../models/student.model');
const { getMobileProvider } = require('../utils/providerFinder');
const { alertTutorService } = require('../utils/alertTutorOfNewTutorialService');
const { alertTutorVideo } = require('../utils/alertTutorOfNewTutorialVideo');
const { generateRandomCode } = require('../utils/qrCodeGenerator');

require('dotenv').config();
const Paystack = require('paystack')(process.env.secretKey);

class PaymentServices {

    // function fetch pending tutorials for payment
    static async fetchPayments(studentID) {
        try {
            // Fetch payments where status is 'pending'
            const payments = await pendingTutorialsModel.find({
                studentID: studentID,
            }).exec();
            return payments;
        } catch (error) {
            console.error('Error fetching payments:', error);
            return null;
        }
    }

    static async makePayment(tutorialID, tutorID, tutorName, tutorEmail, tutorNumber, tutorialTitle, amount, studentID, studentName, studentNumber, studentEmail) {
        const provider = getMobileProvider(studentNumber);
        return new Promise(async (resolve, reject) => {
            try {
                Paystack.transaction.initialize({
                    email: studentEmail,
                    amount: amount * 100,
                    currency: "GHS",
                    channels: ['mobile_money'],
                    mobile_money: {
                        phone: studentNumber,
                        provider: provider
                    }
                }, async function (error, body) {
                    if (error) {
                        reject(error);
                    } else {
                        try {
                            const service = await tutorialServiceModel.findById(tutorialID);
                            if (service) {
                                service.sales++;
                                await service.save();
                                const tutor = await tutorModel.findById(tutorID);
                                tutor.sales++;
                                await tutor.save();
                                alertTutorService(tutorName, tutorEmail, studentName, studentEmail, studentNumber, tutorialTitle, amount);
                                const qrCode = generateRandomCode(tutorialID);
                                const pendingTutorial = await PendingTutorialServices.createPendingTutorial(tutorID, studentID, tutorName, studentName, studentEmail, tutorEmail, tutorialTitle, amount, qrCode, tutorNumber, studentNumber);
                            } else {
                                const video = await tutorialVideoModel.findById(tutorialID);
                                if (video) {
                                    video.sales++;
                                    await video.save();
                                    const tutor = await tutorModel.findById(tutorID);
                                    tutor.sales++;
                                    await tutor.save();
                                    const student = await studentModel.find({studentID: studentID});
                                    student.numberOfVideos++;
                                    await student.save();
                                    alertTutorVideo(tutorName, tutorEmail, tutorialTitle, amount);
                                }
                            }
                            resolve(body);
                        } catch (err) {
                            reject(err);
                        }
                    }
                });
            } catch (error) {
                console.error('Error making payment.', error);
                reject(error);
            }
        });
    }


    // function to pay tutor after student has tutorial is complete
    static async payTutor(amount, tutorNumber, tutorEmail, studentID) {
        const provider = getMobileProvider(tutorNumber);
        try {
            return new Promise((resolve, reject) => {
                Paystack.transaction.initialize({
                    email: tutorEmail,
                    amount: amount * 100,
                    currency: "GHS",
                    channels: ['mobile_money'],
                    mobile_money: {
                        phone: tutorNumber,
                        provider: provider
                    }
                }, async function (error, body) {
                    if (error) {
                        reject(error);
                    } else {
                        const student = await studentModel.find({studentID: studentID});
                        student.numberOfServices++;
                        await student.save();
                        resolve(body);
                    }
                });
            });
        } catch (error) {
            console.error('Error paying user:', error);
            return null;
        }
    }

}

module.exports = PaymentServices;
