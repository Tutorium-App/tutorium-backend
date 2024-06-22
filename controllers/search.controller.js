const SearchServices = require('../services/search.services');
const { sendErrorResponse } = require('../utils/errorHandler');

// Function to fetch all tutorial services and videos
exports.fetchAllTutorials = async (req, res, next) => {
    try {
        const { school } = req.query;

        const searchData = await SearchServices.fetchAllTutorials(school);

        if (!searchData) {
            return sendErrorResponse(res, 500, 'Error fetching tutorials');
        }

        res.json({ status: true, success: searchData });
    } catch (error) {
        next(error);
    }
};

