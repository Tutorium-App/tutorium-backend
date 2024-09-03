const PendingTutorialServices = require('../services/pendingTutorials.services');
const tutorialServiceModel = require('../models/tutorialService.model');
const paymentDetailsModel = require('../models/paymentDetails.model');
const payTutorDetailsModel = require('../models/payTutorDetails.model');
const payTutorForVideosDetailsModel = require('../models/payTutorForVideo.model');
const tutorialVideoModel = require('../models/tutorialVideo.model');
const tutorModel = require('../models/tutor.model');
const studentModel = require('../models/student.model');
const { alertTutorService } = require('../utils/alertTutorOfNewTutorialService');
const { alertTutorVideo } = require('../utils/alertTutorOfNewTutorialVideo');
const { generateRandomCode } = require('../utils/qrCodeGenerator');
const BoughtVideoServices = require('../services/boughtVideo.services');
const PaymentServices = require('../services/payment.services');
const TutorialRequestServices = require('../services/tutorialRequest.services');
const HistoryServices = require('../services/history.services');
const crypto = require('crypto');

exports.handlePaystackCallback = async (req, res) => {
    try {
        const payload = req.body;

        const paystackSignature = req.headers['x-paystack-signature'];
        const secretKey = process.env.secretKey;

        const hash = crypto.createHmac('sha512', secretKey).update(JSON.stringify(payload)).digest('hex');
        if (hash !== paystackSignature) {
            console.error('Invalid Paystack signature');
            return res.status(401).send('Invalid Paystack signature');
        }

        const event = payload.event;

        switch (event) {
            case 'charge.success':
                console.log('Payment was successful');

                const reference = payload.data.reference;
                // console.log('Payment reference:', reference);

                try {
                    const paymentDetails = await paymentDetailsModel.findOne({ paymentReference: reference });
                    if (!paymentDetails) {
                        console.error('Payment details not found for reference:', reference);
                        return res.status(404).send('Payment details not found');
                    }

                    if (paymentDetails.isRequest) {
                        const request = await TutorialRequestServices.deleteTutorialRequest(paymentDetails.requestID);
                        if (request) {
                            console.log("Request deleted");
                        } else {
                            console.log("Request not found");
                        }
                    }

                    try {
                        const service = await tutorialServiceModel.findById(paymentDetails.tutorialID);
                        if (service) {
                            service.sales++;
                            await service.save();

                            const tutor = await tutorModel.findOne({ tutorID: paymentDetails.tutorID });
                            tutor.sales++;
                            tutor.balance += paymentDetails.amount;
                            await tutor.save();

                            alertTutorService(paymentDetails.tutorEmail, paymentDetails.tutorName, paymentDetails.studentName, paymentDetails.studentEmail, paymentDetails.studentNumber, paymentDetails.tutorialTitle, paymentDetails.amount);

                            const qrCode = generateRandomCode(paymentDetails.tutorialID);

                            console.log(paymentDetails.tutorID,
                                paymentDetails.studentID,
                                paymentDetails.tutorName,
                                paymentDetails.studentName,
                                paymentDetails.studentEmail,
                                paymentDetails.tutorEmail,
                                paymentDetails.tutorialTitle,
                                paymentDetails.amount,
                                qrCode,
                                paymentDetails.category,
                                paymentDetails.tutorNumber,
                                paymentDetails.studentNumber,
                                paymentDetails.imageURL);

                            //create pending tutorial
                            await PendingTutorialServices.createPendingTutorial(
                                paymentDetails.tutorID,
                                paymentDetails.studentID,
                                paymentDetails.tutorName,
                                paymentDetails.studentName,
                                paymentDetails.studentEmail,
                                paymentDetails.tutorEmail,
                                paymentDetails.tutorialTitle,
                                paymentDetails.amount,
                                qrCode,
                                paymentDetails.category,
                                paymentDetails.tutorNumber,
                                paymentDetails.studentNumber,
                                paymentDetails.imageURL
                            );

                            console.log("done");

                        } else {
                            const video = await tutorialVideoModel.findById(paymentDetails.tutorialID);
                            if (video) {
                                await PaymentServices.payTutorForVideo(paymentDetails.amount, paymentDetails.tutorNumber, paymentDetails.tutorName);

                                video.sales++;
                                await video.save();

                                const tutor = await tutorModel.findOne({ tutorID: paymentDetails.tutorID });
                                tutor.sales++;
                                await tutor.save();

                                const student = await studentModel.findOne({ studentID: paymentDetails.studentID });
                                student.numberOfVideos++;
                                await student.save();

                                alertTutorVideo(paymentDetails.tutorEmail, paymentDetails.tutorName, paymentDetails.tutorialTitle, paymentDetails.amount);

                                await BoughtVideoServices.createBoughtVideo(
                                    paymentDetails.tutorID,
                                    paymentDetails.tutorName,
                                    paymentDetails.tutorEmail,
                                    paymentDetails.tutorNumber,
                                    paymentDetails.tutorialTitle,
                                    video.category,
                                    video.description,
                                    video.dateCreated,
                                    video.school,
                                    video.cost,
                                    video.thumbnailLink,
                                    video.videoLink
                                );
                            }
                        }
                    } catch (err) {
                        console.error('Error handling successful payment:', err);
                        return res.status(500).send('Error handling successful payment');
                    }

                    await paymentDetailsModel.deleteOne({ paymentReference: reference });
                    return res.status(200).send('Payment successful');
                } catch (error) {
                    console.error('Error handling successful payment:', error);
                    return res.status(500).send('Error handling successful payment');
                }
                break;

            case 'charge.failure':
                console.log('Payment failed');

                const ref_ = payload.data.reference;
                // console.log('Payment reference:', reference);

                const paymentDetails_ = await paymentDetailsModel.findOne({ paymentReference: ref_ });
                if (!paymentDetails_) {
                    console.error('Payment details not found for reference:', reference);
                    return res.status(404).send('Payment details not found');
                }

                const message = `Dear ${paymentDetails_.studentName},
                We noticed that you attempted to make a payment for a tutorial titled: ${paymentDetails_.tutorialTitle}. However, our system did not process your payment. This may have been due to a network interruption or if you canceled the payment yourself.
                If you're still interested in this tutorial, we encourage you to try making the payment again. If you require any assistance with our platform, please don't hesitate to contact customer service. Thank you for choosing Tutorium.\n
                Regards,
                The Tutorium Team \n
                [Customer service email: tutorium.customer@gmail.com. Email us here.]`;

                const subject = "Payment Not Processed!!!";

                let Email = await EmailServices.sendEmail(paymentDetails_.studentEmail, paymentDetails_.studentName, subject, message);

                if (!Email) {
                    return sendErrorResponse(res, 500, 'Error sending email');
                }
                return res.status(500).send('Payment failed');

                break;

            case 'transfer.success':
                console.log('Transfer was successful');

                const ref = payload.data.reference;
                // console.log('Transfer reference:', ref);

                let paymentDetail = await payTutorDetailsModel.findOne({ reference: ref });
                //console.log("data: ", paymentDetail);
                if (paymentDetail) {
                    //console.log("running insider");
                    const currentDate = new Date();

                    function formatDate(date) {
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                        const year = date.getFullYear();

                        return `${day}-${month}-${year}`;
                    }

                    const formattedDate = formatDate(currentDate);

                    const student = await studentModel.findOne({ studentID: paymentDetail.studentID });
                    student.numberOfServices++;
                    await student.save();

                    const tutor = await tutorModel.findOne({ tutorID: paymentDetail.tutorID });
                    tutor.balance -= paymentDetail.amount;
                    await tutor.save();

                    await HistoryServices.createHistory(paymentDetail.tutorID, paymentDetail.tutorName, paymentDetail.studentID, paymentDetail.title, paymentDetail.category, formattedDate, paymentDetail.amount);

                    await payTutorDetailsModel.deleteOne({ reference: ref });
                    await PendingTutorialServices.deletePendingTutorial(paymentDetail.tutorialID);
                }

                const paymentDs = await payTutorForVideosDetailsModel.findOne({ reference: ref });
                if (paymentDs) {
                    await payTutorForVideosDetailsModel.deleteOne({ reference: ref });
                }
                break;

            case 'transfer.failed':
                console.log('Transfer failed');

                const refs = payload.data.reference;
                console.log('Transfer failed reference:', refs);

                const failedPaymentDetail = await payTutorDetailsModel.findOne({ reference: refs });
                if (failedPaymentDetail) {
                    await PaymentServices.makeTransfer(failedPaymentDetail.amount, failedPaymentDetail.recipientCode, failedPaymentDetail.reference, failedPaymentDetail.reason);
                }

                const failedPaymentDs = await payTutorForVideosDetailsModel.findOne({ reference: refs });
                if (failedPaymentDs) {
                    await PaymentServices.makeTransfer(failedPaymentDs.amount, failedPaymentDs.recipientCode, failedPaymentDs.reference, failedPaymentDs.reason);
                }
                break;

            case 'transfer.reversed':
                console.log('Transfer reversed');
                break;

            default:
                console.log(`Unsupported event type: ${event}`);
                break;
        }

        res.status(200).send('Webhook received successfully');
    } catch (error) {
        console.error('Error handling webhook:', error);
        res.status(500).send('Error handling webhook');
    }
};
