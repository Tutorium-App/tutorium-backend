const router = require('express').Router();
const pendingTutorialsController = require('../controllers/pendingTutorials.controller');

// fetch pending tutorials for payment
router.get('/fetchPendingTutorials', pendingTutorialsController.fetchPendingTutorials);

// request refund
router.get('/requestRefund', pendingTutorialsController.requestRefund);

// delete pending tutorial service / approve refund
router.get('/approveRefund', pendingTutorialsController.approveRefund);

module.exports = router;

//* Define the various routes to the server in this file
 