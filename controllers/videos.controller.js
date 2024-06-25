const VideosServices = require('../services/videos.services');
const { sendErrorResponse } = require('../utils/errorHandler');

// Function to fetch all tutorial videos
exports.fetchAllVideos = async (req, res, next) => {
    try {
        const { school } = req.query;

        const videos = await VideosServices.fetchAllVideos(school);

        if (!videos) {
            return sendErrorResponse(res, 500, 'Error fetching tutorial videos');
        }

        res.json({ status: true, success: videos });
    } catch (error) {
        next(error);
    }
};

// Function to fetch popular tutorial videos
exports.fetchPopularVideos = async (req, res, next) => {
    try {
        const { school } = req.query;

        const popularVideos = await VideosServices.fetchPopularVideos(school);

        if (!popularVideos) {
            return sendErrorResponse(res, 500, 'Error fetching tutorial popular services');
        }

        res.json({ status: true, success: popularVideos });
    } catch (error) {
        next(error);
    }
};

// Function to fetch tutorial videos by tutor id
exports.fetchTutorVideos = async (req, res, next) => {
    try {
        const { tutorID } = req.query;

        const videos = await VideosServices.fetchTutorVideos(tutorID);

        if (!videos) {
            return sendErrorResponse(res, 500, 'Error fetching tutorial videos');
        }

        res.json({ status: true, success: videos });
    } catch (error) {
        next(error);
    }
}; 