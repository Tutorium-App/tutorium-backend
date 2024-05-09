const AdsServices = require('../services/ads.services');
const { sendErrorResponse } = require('../utils/errorHandler');


// function to fetch ads data from database
exports.loadAds = async (req, res, next)=>{
    try {
        
        let adsData = await AdsServices.loadAds();

        if (!adsData) {
            return sendErrorResponse(res, 500, 'Error deleting stduent account');
        }

        res.json({status: true, success: adsData});
    } catch (error) {
        next(error);
    }
}

