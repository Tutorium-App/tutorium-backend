const StudentDataServices = require('../services/studentData.services');
const { sendErrorResponse } = require('../utils/errorHandler');

// Function to fetch student data
exports.studentData = async (req, res, next) => {
    try {
        const { studentID } = req.body;

        const data = await StudentDataServices.studentData(studentID);

        if (!data) {
            return sendErrorResponse(res, 500, 'Error fetching student data');
        }

        res.json({ status: true, success: data });
    } catch (error) {
        next(error);
    }
};

// Function to edit student data
exports.editStudentData = async (req, res, next) => {
    try {
        const { studentID, fullName, email, phone, program, year } = req.body;

        const data = await StudentDataServices.editStudentData(studentID, fullName, email, phone, program, year);

        if (!data) {
            return sendErrorResponse(res, 500, 'Error editing student data');
        }

        res.json({ status: true, success: data });
    } catch (error) {
        next(error);
    }
};
