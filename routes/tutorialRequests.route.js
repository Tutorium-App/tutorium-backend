const router = require('express').Router();

const tutorialRequestController = require('../controllers/tutorialRequest.controller');

// Read tutorial requests
router.get('/readTutorialRequests', tutorialRequestController.readTutorialRequests);

// Accept tutorial request
router.post('/acceptTutorialRequest', tutorialRequestController.acceptTutorialRequest);

module.exports = router;


//* Define the various routes to the server in this file
 