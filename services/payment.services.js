require('dotenv').config();
const HistoryServices = require('./history.services');
const PaymentDetailsServices = require('./paymentDetails.services');
const pendingTutorialsModel = require('../models/pendingTutorials.model');
const studentModel = require('../models/student.model');
const tutorModel = require('../models/tutor.model');
const { getMobileProvider } = require('../utils/providerFinder');
const { generateTransferReference } = require('../utils/generateReference');
const axios = require('axios');

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

    static async makePayment(paymentData) {
        const provider = getMobileProvider(paymentData.studentNumber);
        return new Promise(async (resolve, reject) => {
            try {
                Paystack.transaction.initialize({
                    email: paymentData.studentEmail,
                    amount: paymentData.amount * 100,
                    currency: "GHS",
                    channels: ['mobile_money'],
                    mobile_money: {
                        phone: paymentData.studentNumber,
                        provider: provider
                    }
                }, async function (error, body) {
                    if (error) {
                        reject(error);
                    } else {
                        // Check if body.data exists and has the expected structure
                        if (body && body.data && body.data.reference) {
                            const reference = body.data.reference;
                            const paymentDetails = await PaymentDetailsServices.storePaymentDetails(reference, paymentData.tutorialID, paymentData.tutorID, paymentData.tutorName, paymentData.tutorEmail, paymentData.studentID, paymentData.studentName, paymentData.studentNumber, paymentData.studentEmail, paymentData.tutorNumber, paymentData.tutorialTitle, paymentData.amount);
                            resolve(body); // Resolve the promise with the entire body
                        } else {
                            console.error('Invalid response structure from Paystack');
                            reject(new Error('Invalid response structure from Paystack'));
                        }
                    }
                });
            } catch (error) {
                console.error('Error making payment.', error);
                reject(error);
            }
        });
    }


    static async createTransfer(name, accountNumber, bankCode) {
        try {
            const response = await axios.post('https://api.paystack.co/transferrecipient',
            {
                type: "mobile_money",
                name: name, // recipient's name
                account_number: accountNumber, // recipient's momo number
                bank_code: bankCode, // service provider
                currency: "GHS" 
            },
             {
                headers: {
                    'Authorization': `Bearer ${process.env.secretKey}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.data.status) {
                return response.data.data.recipient_code;
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            throw error;
        }
    }
    
    static async makeTransfer(amount, recipientCode, reference, reason) {
        const requestData = {
            source: "balance",
            amount: amount,
            reason: reason,
            reference: reference,
            recipient: recipientCode
        };
    
        try {
            const response = await axios.post('https://api.paystack.co/transfer', requestData, {
                headers: {
                    'Authorization': `Bearer ${secretKey}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.data.status) {
                return response.data.data;
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            throw error;
        }
    }


    static async payTutor(tutorID, tutorName, title, category, amount, tutorNumber, tutorEmail, studentID) {
        const reason = "Pay Tutorium tutor.";
        const reference = generateTransferReference();
        const bankCode = getMobileProvider(tutorNumber).toUpperCase();
        const newAmount = amount - (amount * 0.10);


        try {
            // Create transfer recipient
            const recipientCode = await PaymentServices.createTransfer(tutorName, tutorNumber, bankCode);
            console.log("Recipient code:", recipientCode);
    
            // Make transfer
            // const paymentData = await PaymentServices.makeTransfer(newAmount, recipientCode, reference, reason);
            // console.log("Payment data:", paymentData);
            
            // return paymentData;
        } catch (error) {
            throw error;
        }
    }


    // function to pay tutor after student has paid for tutorial video
    static async payTutorForVideo(amount, tutorNumber, tutorEmail) {
        const provider = getMobileProvider(tutorNumber);
        var newAmount = amount - (amount * 0.10);
        try {
            // Construct the transfer request
            const transferRequest = {
                source: "balance",
                amount: newAmount * 100, // Amount in kobo (minor currency unit)
                reason: "Payment for tutorial video",
                reference: "TUTORIUM_PAYMENT_" + Date.now(), // You might want to generate a unique reference for each transfer
                currency: "GHS",
                recipient: tutorNumber,
                metadata: {
                    email: tutorEmail
                },
                // Additional parameters specific to mobile money transfer
                type: "mobile_money",
                provider: provider // Mobile money provider (e.g., "MTN", "Vodafone")
            };

            // Initialize the transfer
            const payment = await Paystack.transfer.create(transferRequest);

            return payment;
        } catch (error) {
            console.error('Error paying tutor for video:', error);
            throw error;
        }
    }



}

module.exports = PaymentServices;
