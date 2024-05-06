const HomeScreenServices = require('../services/homeScreenData.services');
const { sendErrorResponse } = require('../utils/errorHandler');
 
// function to get tutor data using the tutorID
exports.fetchHomeScreenData = async (req, res, next) => {
    try {
        const { tutorID } = req.body;

        const tutorData = await HomeScreenServices.fetchHomeScreenData(tutorID);

        if (!tutorData) {
            return sendErrorResponse(res, 500, 'Error fetching tutor details');
        }

        res.json({ status: true, success: tutorData });
    } catch (error) {
        next(error);
    }
}; 

// function to upload a tutorial service
exports.uploadTutorialService = async (req, res, next) => {
    try {
        const { tutorID, title, category, description, dateCreated, school, cost, thumbnailLink} = req.body;

        const tutorService = await HomeScreenServices.uploadTutorialService(tutorID, title, category, description, dateCreated, school, cost, thumbnailLink);

        if (!tutorService) {
            return sendErrorResponse(res, 500, 'Failed to upload tutorial service');
        }

        res.json({ status: true, success: tutorService });
    } catch (error) {
        next(error);
    }
};

// function to create a tutorial video
exports.uploadTutorialVideo = async (req, res, next) => {
    try {
        const { tutorID, title, category, description, dateCreated, school, cost, thumbnailLink, videoLink } = req.body;

        const tutorData = await HomeScreenServices.uploadTutorialVideo(tutorID, title, category, description, dateCreated, school, cost, thumbnailLink, videoLink);

        if (!tutorData) {
            return sendErrorResponse(res, 500, 'Failed to upload tutorial service');
        }

        res.json({ status: true, success: tutorData });
    } catch (error) {
        next(error);
    }
};
