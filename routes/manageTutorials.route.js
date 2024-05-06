const router = require('express').Router();

const manageTutorialController = require('../controllers/manageTutorial.controller');

 
// Read tutorial services
router.get('/readTutorialServices', manageTutorialController.readTutorialServices);

// Read tutorial videos
router.get('/readTutorialVideos', manageTutorialController.readTutorialVideos);

// Read pending tutorials
router.get('/readPendingTutorials', manageTutorialController.readPendingTutorials);

// Delete tutorial service
router.post('/deleteTutorialService', manageTutorialController.deleteTutorialService);

// Delete tutorial video
router.post('/deleteTutorialVideo', manageTutorialController.deleteTutorialVideo);

// Cancel pending tutorial
router.post('/cancelPendingTutorial', manageTutorialController.cancelPendingTutorial);

// Update tutorial service
router.post('/updateTutorialService', manageTutorialController.updateTutorialService);

// Update tutorial video
router.post('/updateTutorialVideo', manageTutorialController.updateTutorialVideo);


module.exports = router;
