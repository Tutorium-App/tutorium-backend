const router = require('express').Router();

const tutorDataController = require('../controllers/tutorsData.controller');


// fetch tutor data by id
router.get('/tutorData', tutorDataController.tutorData);


module.exports = router;


//* Define the various routes to the server in this file
