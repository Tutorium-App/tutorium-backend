const router = require('express').Router();

const tutorialRequestController = require('../controllers/tutorialRequest.controller');

// fetch accepted requests
router.get('/fetchAcceptedRequests', tutorialRequestController.fetchAcceptedRequests);

// accepted request
router.post('/acceptRequest', tutorialRequestController.acceptTutorialRequest);

// create request
router.post('/createRequest', tutorialRequestController.createRequest);

module.exports = router;


//* Define the various routes to the server in this file
 