const router = require('express').Router();

const profileController = require('../controllers/profile.controller');


//edit profile details
router.post('/editProfileDetails', profileController.editProfileDetails);


module.exports = router;


//* Define the various routes to the server in this file
