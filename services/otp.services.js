const axios = require('axios');
const { formatNumber } = require('../utils/formatNumber');
require('dotenv').config();

const apiKey = process.env.apiKey;

class OTPServices {
    // SEND SMS
    static async sendOTP(number, otp) {
        const from = "Tutorium";
        let num = formatNumber(number);
        let message = `Welcome to Tutorium.\n
        Your One Time Password is ${otp}
        Thank you.
        `;

        try {
            const response = await axios.get(`https://sms.arkesel.com/sms/api?action=send-sms&api_key=${apiKey}&to=${num}&from=${from}&sms=${message}`);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = OTPServices;
