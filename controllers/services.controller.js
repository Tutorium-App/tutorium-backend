const ServicesServices = require('../services/services.services');
const { sendErrorResponse } = require('../utils/errorHandler');

// Function to fetch all tutorial services
exports.fetchAllServices = async (req, res, next) => {
    try {
        const { school } = req.query;

        const services = await ServicesServices.fetchAllServices(school);

        if (!services) {
            return sendErrorResponse(res, 500, 'Error fetching tutorial services');
        }

        res.json({ status: true, success: services });
    } catch (error) {
        next(error);
    }
};

// Function to fetch popular tutorial services
exports.fetchPopularServices = async (req, res, next) => {
    try {
        const { school } = req.query;

        const popularServices = await ServicesServices.fetchPopularServices(school);
        // console.log(popularServices)

        if (!popularServices) {
            return sendErrorResponse(res, 500, 'Error fetching tutorial popular services');
        }

        res.json({ status: true, success: popularServices });
    } catch (error) {
        next(error);
    }
};

// Function to fetch tutorial services by tutor id
exports.fetchTutorServices = async (req, res, next) => {
    try {
        const { tutorID } = req.query;

        const services = await ServicesServices.fetchTutorServices(tutorID);

        if (!services) {
            return sendErrorResponse(res, 500, 'Error fetching tutorial services');
        }

        res.json({ status: true, success: services });
    } catch (error) {
        next(error);
    }
};