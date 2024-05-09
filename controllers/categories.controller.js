const CategoriesServices = require('../services/categories.services');
const { sendErrorResponse } = require('../utils/errorHandler');


// function to fetch academics category
exports.fetchAcademics = async (req, res, next)=>{
    try {
        const {school} = req.body;
        
        let data = await CategoriesServices.load(school);

        if (!data) {
            return sendErrorResponse(res, 500, 'Error fetching academics data');
        }

        res.json({status: true, success: data});
    } catch (error) {
        next(error);
    }
}

// function to fetch skills category
exports.fetchSkills = async (req, res, next)=>{
    try {
        const {school} = req.body;
        
        let data = await CategoriesServices.load(school);

        if (!data) {
            return sendErrorResponse(res, 500, 'Error fetching skills data');
        }

        res.json({status: true, success: data});
    } catch (error) {
        next(error);
    }
}

// function to fetch others category
exports.fetchOthers = async (req, res, next)=>{
    try {
        const {school} = req.body;
        
        let data = await CategoriesServices.load(school);

        if (!data) {
            return sendErrorResponse(res, 500, 'Error fetching others data');
        }

        res.json({status: true, success: data});
    } catch (error) {
        next(error);
    }
}
