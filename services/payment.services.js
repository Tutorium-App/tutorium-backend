const HistoryServices = require('./history.services');
const pendingTutorialsModel = require('../models/pendingTutorials.model');
const studentModel = require('../models/student.model');
const { getMobileProvider } = require('../utils/providerFinder');


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
                        resolve(body);
                    }
                });
            } catch (error) {
                console.error('Error making payment.', error);
                reject(error);
            }
        });
    }


    // function to pay tutor after student has confirmed tutorial is complete
    static async payTutor(tutorID, tutorName, title, category, amount, tutorNumber, tutorEmail, studentID) {
        const provider = getMobileProvider(tutorNumber);
        var newAmount = amount - (amount * 0.10);
        try {
            const currentDate = new Date();
            return new Promise((resolve, reject) => {
                Paystack.transaction.initialize({
                    email: tutorEmail,
                    amount: newAmount * 100,
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
                        const student = await studentModel.findOne({ studentID: studentID });
                        student.numberOfServices++;
                        await student.save();
                        const history = await HistoryServices.createHistory(tutorID, tutorName, studentID, title, category, currentDate, amount);
                        resolve(body);
                    }
                });
            });
        } catch (error) {
            console.error('Error paying user:', error);
            return null;
        }
    }

    // function to pay tutor after student has paid for tutorial video
    static async payTutorForVideo(amount, tutorNumber, tutorEmail) {
        const provider = getMobileProvider(tutorNumber);
        var newAmount = amount - (amount * 0.10);
        try {
            const currentDate = new Date();
            return new Promise((resolve, reject) => {
                Paystack.transaction.initialize({
                    email: tutorEmail,
                    amount: newAmount * 100,
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
