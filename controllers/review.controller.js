const ReviewServices = require('../services/review.services');
const { sendErrorResponse } = require('../utils/errorHandler');

// Function to fetch reviews using tutorID
exports.fetchReviews = async (req, res, next) => {
    try {
        const { tutorID } = req.body;

        const reviews = await ReviewServices.fetchReviews(tutorID);

        if (!reviews) {
            return sendErrorResponse(res, 500, 'Error fetching reviews');
        }

        res.json({ status: true, success: reviews });
    } catch (error) {
        next(error);
    }
};
