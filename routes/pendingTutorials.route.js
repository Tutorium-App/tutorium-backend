const router = require('express').Router();
const pendingTutorialsController = require('../controllers/pendingTutorials.controller');

// verify a pending tutorial for payment
router.post('/verifyQRCode', pendingTutorialsController.verifyQRCode);

// fetch pending tutorials for payment
router.get('/fetchPendingTutorials', pendingTutorialsController.fetchPendingTutorials);

// request refund
router.post('/requestRefund', pendingTutorialsController.requestRefund);

// delete pending tutorial service / approve refund
router.post('/approveRefund', pendingTutorialsController.approveRefund);

module.exports = router;

//* Define the various routes to the server in this file
 