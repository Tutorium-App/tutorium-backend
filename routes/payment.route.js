const router = require('express').Router();

const paymentController = require('../controllers/payment.controller');


// fetch all payments
router.get('/fetchPayments', paymentController.fetchPayments); 


// make payment
router.post('/makePayment', paymentController.makePayment); 

module.exports = router;


//* Define the various routes to the server in this file
