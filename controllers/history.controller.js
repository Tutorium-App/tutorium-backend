const HistoryServices = require('../services/history.services');
const { sendErrorResponse } = require('../utils/errorHandler');


// function to fetch histories
exports.fetchAllHistory = async (req, res, next)=>{
    try {
        const {studentID} = req.query;
        
        let data = await HistoryServices.load(studentID);

        if (!data) {
            return sendErrorResponse(res, 500, 'Error fetching histories');
        }

        res.json({status: true, success: data});
    } catch (error) {
        next(error);
    }
}

// Function to create history
exports.createHistory = async (req, res, next) => {
    try {
        const { tutorID, tutorName, studentID, title, category, description, dateEnded, cost } = req.body;

        const history = await HistoryServices.createHistory(tutorID, tutorName, studentID, title, category, description, dateEnded, cost);

        if (!history) {
            return sendErrorResponse(res, 500, 'Error creating history');
        }

        res.json({ status: true, success: history });
    } catch (error) {
        next(error);
    }
};
