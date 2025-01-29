const axios = require('axios');
const { formatNumber } = require('../utils/formatNumber');
require('dotenv').config();

const apiKey = process.env.apiKey;

class SMSServices {
    // SEND SMS
    static async sendSMS(number, message) {
        const from = "Tutorium";
        let num = formatNumber(number);

        try {
            const response = await axios.get(`https://sms.arkesel.com/sms/api?action=send-sms&api_key=${apiKey}&to=${num}&from=${from}&sms=${message}`);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = SMSServices;
