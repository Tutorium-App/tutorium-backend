const CategoriesServices = require('../services/categories.services');
const { sendErrorResponse } = require('../utils/errorHandler');

// Common function to handle the fetching of categories
async function fetchCategory(req, res, categoryType) {
    try {
        const { school } = req.body;

        let data = await CategoriesServices.load(school, categoryType);

        if (!data) {
            return sendErrorResponse(res, 500, `Error fetching ${categoryType} data`);
        }

        res.json({ status: true, success: data });
    } catch (error) {
        next(error);
    }
}

// Function to fetch academics category
exports.fetchAcademics = (req, res, next) => {
    fetchCategory(req, res, 'academics');
}

// Function to fetch skills category
exports.fetchSkills = (req, res, next) => {
    fetchCategory(req, res, 'skills');
}

// Function to fetch others category
exports.fetchOthers = (req, res, next) => {
    fetchCategory(req, res, 'others');
}
