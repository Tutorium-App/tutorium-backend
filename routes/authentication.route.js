const router = require('express').Router();

const authenticationController = require('../controllers/authentication.controller');


//creating a user
router.post('/storeStudentData', authenticationController.storeStudentData);


//delete account
router.post('/deleteAccount', authenticationController.deleteAccount);
 
module.exports = router;

