const paymentModel = require('../models/payment.model');


class PaymentServices {
    static async fetchPayments(tutorID) {
        try {
            // Fetch payments where status is 'pending'
            const payments = await paymentModel.find({
                tutorID: tutorID,
            }).exec();
            return payments;
        } catch (error) {
            console.error('Error fetching payments:', error);
            return null;
        }
    }
}

module.exports = PaymentServices;
