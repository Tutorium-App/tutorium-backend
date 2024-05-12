const studentModel = require('../models/student.model');

class StudentDataServices {
    // Fetch student data by student ID
    static async studentData(studentID) {
        try {
            const student = await studentModel.findOne({ studentID: studentID });
            return student;
        } catch (error) {
            console.error("Error fetching student data:", error);
            throw error; // Re-throw the error to be handled by the controller
        }
    }

    // Edit student data
    static async editStudentData(studentID, fullName, email, phone, program, year) {
        try {
            const student = await studentModel.findOneAndUpdate(
                { studentID: studentID },
                { fullName, email, phone, program, year },
                { new: true } // Return the updated document
            );
            return student;
        } catch (error) {
            console.error("Error editing student data:", error);
            throw error; // Re-throw the error to be handled by the controller
        }
    }
}

module.exports = StudentDataServices;
