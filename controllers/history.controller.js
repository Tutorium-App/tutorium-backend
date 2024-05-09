const HistoryServices = require('../services/history.services');
const { sendErrorResponse } = require('../utils/errorHandler');


// function to fetch histories
exports.fetchAllHistory = async (req, res, next)=>{
    try {
        const {studentID} = req.body;
        
        let data = await HistoryServices.load(studentID);

        if (!data) {
            return sendErrorResponse(res, 500, 'Error fetching histories');
        }

        res.json({status: true, success: data});
    } catch (error) {
        next(error);
    }
}

