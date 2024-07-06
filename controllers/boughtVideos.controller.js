const BoughtVideosServices = require('../services/boughtVideo.services');
const { sendErrorResponse } = require('../utils/errorHandler');


// function to fetch all bought videos by student id
exports.loadBoughtVideos = async (req, res, next)=>{
    try {

        const {studentID} = req.query;
        
        let boughtVideos = await BoughtVideosServices.loadBoughtVideos(studentID);

        if (!boughtVideos) {
            return sendErrorResponse(res, 404, 'No videos bought by student');
        }

        res.json({status: true, success: boughtVideos});
    } catch (error) {
        next(error);
    } 
}

// Function to create bought video
exports.createBoughtVideo = async (req, res, next) => {
    try {
        const { tutorID, studentID, tutorName, tutorEmail, tutorNumber, title, category, description, dateCreated, school, cost, thumbnailLink, videoLink, rating } = req.body;

        const boughtVideo = await BoughtVideosServices.createBoughtVideo(tutorID, studentID, tutorName, tutorEmail, tutorNumber, title, category, description, dateCreated, school, cost, thumbnailLink, videoLink, rating);

        if (!boughtVideo) {
            return sendErrorResponse(res, 500, 'Error creating bought video');
        }

        res.json({ status: true, success: boughtVideo });
    } catch (error) {
        next(error);
    }
};