const CategoriesServices = require('../services/categories.services');
const { sendErrorResponse } = require('../utils/errorHandler');

// Common function to handle the fetching of categories
async function fetchCategory(req, res, categoryType) {
    try {
        const { school } = req.query;
        // console.log(school, categoryType);

        let data = await CategoriesServices.load(school, categoryType);
        // console.log(data);

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
    fetchCategory(req, res, 'Academics');
}

// Function to fetch skills category
exports.fetchSkills = (req, res, next) => {
    fetchCategory(req, res, 'Skills');
}

// Function to fetch others category
exports.fetchOthers = (req, res, next) => {
    fetchCategory(req, res, 'Others');
}
