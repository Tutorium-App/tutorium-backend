const router = require('express').Router();

const tutorDataController = require('../controllers/tutorData.controller');


// fetch tutor data by id
router.get('/tutorData', tutorDataController.fetchTutorData);


module.exports = router;


//* Define the various routes to the server in this file
