const router = require('express').Router();

const homeScreenDataController = require('../controllers/homeScreenData.controller');


// Read home screen data
router.get('/homeScreenData', homeScreenDataController.fetchHomeScreenData);

//upload tutorial video
router.post('/uploadTutorialVideo', homeScreenDataController.uploadTutorialVideo);

//upload tutorial service
router.post('/uploadTutorialService', homeScreenDataController.uploadTutorialService);
 

module.exports = router;


//* Define the various routes to the server in this file
