const OTPServices = require('../services/otp.services');
const { sendErrorResponse } = require('../utils/errorHandler');


// function to send OTP
exports.sendOTP = async (req, res, next)=>{
    try {

        const {number, pin} = req.body;
        
        let otp = await OTPServices.sendOTP(number, pin);

        if (!otp) {
            return sendErrorResponse(res, 404, 'Error sending OTP, try again');
        }

        res.json({status: true, success: otp});
    } catch (error) {
        next(error);
    } 
}

