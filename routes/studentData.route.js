const router = require('express').Router();

const studentDataController = require('../controllers/studentData.controller');


// fetch student data
router.get('/studentData', studentDataController.fetchstudentData);

// edit student data
router.get('/editStudentData', studentDataController.editStudentData); 

module.exports = router;


//* Define the various routes to the server in this file
