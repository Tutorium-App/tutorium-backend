 // function to pay tutor after student has confirmed tutorial is complete
 static async payTutor(tutorID, tutorName, title, category, amount, tutorNumber, tutorEmail, studentID) {
    const provider = getMobileProvider(tutorNumber);
    var newAmount = amount - (amount * 0.10);
    try {
        const currentDate = new Date();
        // Construct the transfer request
        const transferRequest = {
            source: "balance",
            amount: newAmount * 100, // Amount in kobo (minor currency unit)
            reason: "Payment for tutorial services",
            reference: "TUTOR_PAYMENT_" + Date.now(), // You might want to generate a unique reference for each transfer
            currency: "GHS",
            recipient: tutorNumber,
            metadata: {
                email: tutorEmail
            },
            // Additional parameters specific to mobile money transfer
            type: "mobile_money",
            provider: provider, // Mobile money provider (e.g., "MTN", "Vodafone"),
            recipient_name: tutorName
        };

        // Make the API call to initialize the transfer
        const response = await axios.post('https://api.paystack.co/transfer', transferRequest, {
            headers: {
                Authorization: `Bearer ${process.env.secretKey}`
            }
        });

        // Update student's number of services
        const student = await studentModel.findOne({ studentID: studentID });
        student.numberOfServices++;
        await student.save();

        // Update tutor's balance
        const tutor = await tutorModel.findOne({ tutorID: tutorID });
        tutor.balance -= amount;
        await tutor.save();

        // Log transaction history
        const history = await HistoryServices.createHistory(tutorID, tutorName, studentID, title, category, currentDate, amount);

        return response.data; // Assuming the response contains the payment details
    } catch (error) {
        console.error('Error paying tutor:', error);
        throw error;
    }
}