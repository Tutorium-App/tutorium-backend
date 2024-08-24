const AppDataServices = require('../services/appData.services');
const { sendErrorResponse } = require('../utils/errorHandler');


// function to fetch AppData data from database
exports.loadAppData = async (req, res, next)=>{
    try {
        
        let appData = await AppDataServices.loadAppData();

        if (!appData) {
            return sendErrorResponse(res, 404, 'No appData data found.');
        }

        res.json({status: true, success: appData});
    } catch (error) {
        next(error);
    } 
}


exports.createAppData = async (req, res, next)=>{
    try {

        const { app1Version, app2Version, app1ShareLink, app2ShareLink, app1ShareText, app2ShareText } = req.body;
        
        let appData = await AppDataServices.createAppData(app1Version, app2Version, app1ShareLink, app2ShareLink, app1ShareText, app2ShareText);

        if (!appData) {
            return sendErrorResponse(res, 404, 'Error creating app data');
        }

        res.json({status: true, success: appData});
    } catch (error) {
        next(error);
    } 
}

