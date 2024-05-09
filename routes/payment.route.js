const router = require('express').Router();

const paymentController = require('../controllers/payment.controller');


// fetch all payments
router.get('/fetchPayments', paymentController.fetchPayments); 


// make payment to the Tutorium account
router.post('/makePayment', paymentController.makePayment);

// make payment to a tutor
router.post('/payTutor', paymentController.payTutor);

module.exports = router;


//* Define the various routes to the server in this file
