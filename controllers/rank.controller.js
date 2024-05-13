const RankServices = require('../services/rank.services');
const { sendErrorResponse } = require('../utils/errorHandler');


// function to fetch rank of a tutor
exports.fetchRank = async (req, res, next)=>{
    try {

        const {tutorID, school} = req.body;
        
        let rank = await RankServices.fetchRank(tutorID, school);

        if (!rank) {
            return sendErrorResponse(res, 404, 'Error fetching tutor rank');
        }

        res.json({status: true, success: rank});
    } catch (error) {
        next(error);
    } 
}

