const pendingTutorialsModel = require('../models/pendingTutorials.model');
const { getMobileProvider } = require('./providerFinder');

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
    
    // function make payment into the Tutorium account
    static async makePayment(amount, studentNumber, studentEmail) {
        const provider = getMobileProvider(studentNumber);
        try {
            return new Promise((resolve, reject) => {
                Paystack.transaction.initialize({
                    email: studentEmail,
                    amount: amount * 100, 
                    currency: "GHS",
                    channels: ['mobile_money'],
                    mobile_money: {
                        phone: studentNumber,
                        provider: provider 
                    }
                }, function(error, body) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(body);
                    }
                });
            });
        } catch (error) {
            console.error('Error making payment.', error);
            return null; 
        }
    }

    // function to pay tutor after student has tutorial is complete
    static async payTutor(amount, tutorNumber, tutorEmail) {
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
                }, function(error, body) {
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
