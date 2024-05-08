const router = require('express').Router();

const tutorialRequestController = require('../controllers/tutorialRequest.controller');

// fetch accepted requests
router.get('/fetchAcceptedRequests', tutorialRequestController.fetchAcceptedRequests);

module.exports = router;


//* Define the various routes to the server in this file
 