const ManageTutorialServices = require('../services/manageTutorial.services');
const { sendErrorResponse } = require('../utils/errorHandler');

// function to get all tutorial services
exports.readTutorialServices = async (req, res, next) => {
    try {
        const { tutorID } = req.body;

        const tutorData = await ManageTutorialServices.readTutorialServices(tutorID);

        if (!tutorData) {
            return sendErrorResponse(res, 500, 'Error fetching tutorial services');
        }

        res.json({ status: true, success: tutorData });
    } catch (error) {
        next(error);
    }
};

// function to get all tutorial videos
exports.readTutorialVideos = async (req, res, next) => {
    try {
        const { tutorID } = req.body;

        const tutorData = await ManageTutorialServices.readTutorialVideos(tutorID);

        if (!tutorData) {
            return sendErrorResponse(res, 500, 'Error fetching tutorial videos');
        }

        res.json({ status: true, success: tutorData });
    } catch (error) {
        next(error);
    }
};

// function to get all pending tutorial services
exports.readPendingTutorials = async (req, res, next) => {
    try {
        const { tutorID } = req.body;

        const tutorData = await ManageTutorialServices.readPendingTutorials(tutorID);

        if (!tutorData) {
            return sendErrorResponse(res, 500, 'Error fetching pending tutorial services');
        }

        res.json({ status: true, success: tutorData });
    } catch (error) {
        next(error);
    }
};

// function to delete a tutorial service
exports.deleteTutorialService = async (req, res, next) => {
    try {
        const { tutorialID } = req.body;

        const tutorData = await ManageTutorialServices.deleteTutorialService(tutorialID);

        if (!tutorData) {
            return sendErrorResponse(res, 500, 'Error deleting tutorial service');
        }

        res.json({ status: true, success: tutorData });
    } catch (error) {
        next(error);
    }
};

// function to delete a tutorial video
exports.deleteTutorialVideo = async (req, res, next) => {
    try {
        const { tutorialID } = req.body;

        const tutorData = await ManageTutorialServices.deleteTutorialVideo(tutorialID);

        if (!tutorData) {
            return sendErrorResponse(res, 500, 'Error deleting tutorial video');
        }

        res.json({ status: true, success: tutorData });
    } catch (error) {
        next(error);
    }
}; 

// function to cancel a pending tutorial video
exports.cancelPendingTutorial = async (req, res, next) => {
    try {
        const { tutorialID, studentName, studentEmail, tutorialTitle } = req.body;

        const tutorData = await ManageTutorialServices.cancelPendingTutorial(tutorialID, studentName, studentEmail, tutorialTitle);

        if (!tutorData) {
            return sendErrorResponse(res, 500, 'Error canceling tutorial');
        }

        res.json({ status: true, success: tutorData });
    } catch (error) {
        next(error);
    }
};

// function to update a tutorial service
exports.updateTutorialService = async (req, res, next) => {
    try {
        const { tutorialID, tutorID, title, category, description, thumbnailLInk } = req.body;

        const tutorData = await ManageTutorialServices.updateTutorialService(tutorialID, tutorID, title, category, description, thumbnailLInk);

        if (!tutorData) {
            return sendErrorResponse(res, 500, 'Failed to update tutorial service');
        }

        res.json({ status: true, success: tutorData });
    } catch (error) {
        next(error);
    }
};

// function to update a tutorial video
exports.updateTutorialVideo = async (req, res, next) => {
    try {
        const { tutorialID, tutorID, title, category, description, thumbnailLInk } = req.body;

        const tutorData = await ManageTutorialServices.updateTutorialVideo(tutorialID, tutorID, title, category, description, thumbnailLInk);

        if (!tutorData) {
            return sendErrorResponse(res, 500, 'Failed to update tutorial video');
        }

        res.json({ status: true, success: tutorData });
    } catch (error) {
        next(error);
    }
};
