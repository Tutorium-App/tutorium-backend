const router = require('express').Router();

const otpController = require('../controllers/otp.controller');


//fetch otp
router.post('/sendOTP', otpController.sendOTP);
 
module.exports = router;

