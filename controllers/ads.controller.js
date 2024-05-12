const AdsServices = require('../services/ads.services');
const { sendErrorResponse } = require('../utils/errorHandler');


// function to fetch ads data from database
exports.loadAds = async (req, res, next)=>{
    try {

        const {school} = req.body;
        
        let adsData = await AdsServices.loadAds(school);

        if (!adsData) {
            return sendErrorResponse(res, 404, 'No ads data found for the specified school.');
        }

        res.json({status: true, success: adsData});
    } catch (error) {
        next(error);
    } 
}

// function to count ads click
exports.countClick = async (req, res, next)=>{
    try {

        const {adsID} = req.body;
        
        let click = await AdsServices.countClick(adsID);

        if (!click) {
            return sendErrorResponse(res, 500, 'Error updating ads click count');
        }

        res.json({status: true, success: click});
    } catch (error) {
        next(error);
    }
}

