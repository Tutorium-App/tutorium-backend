const studentModel = require('../models/student.model');
const paymentModel = require('../models/payment.model');
const pendingTutorialModel = require('../models/pendingTutorials.model');
const tutorialRequestModel = require('../models/tutorialRequest.model');

const connection = require('../config/db');

class AuthenticationServices {
    //function to store student data into database
    static async storeStudentData(studentID, fullName, email, phone, dateCreated, school, program, year, profilePhotoLink) {
        var numberOfServices = 0;
        var numberOfVideos = 0;

        const tutorData = new studentModel({ studentID, fullName, email, phone, dateCreated, school, program, year, profilePhotoLink, numberOfServices, numberOfVideos });
        return await tutorData.save();
    }


    //function to delete user account from the database
    static async deleteAccount(studentID) {
        let session = null;
        try {
            // Start a session and transaction for atomic operations
            console.log("Starting transaction for deleting account");
            session = await connection.startSession();
            session.startTransaction();
            console.log("Transaction started");

            // Delete tutor in all related collections
            await studentModel.deleteOne({ studentID: studentID }, { session });
            console.log("Deleted student data");
            await paymentModel.deleteMany({ studentID: studentID }, { session });
            console.log("Deleted payment data");
            await pendingTutorialModel.deleteMany({ studentID: studentID }, { session });
            console.log("Deleted pending tutorial data");
            await tutorialRequestModel.deleteMany({ studentID: studentID }, { session });
            console.log("Deleted tutorial request data");

            // Commit the transaction
            console.log("Committing transaction");
            await session.commitTransaction();
            console.log("Transaction committed");
        } catch (error) {
            // If an error occurs, abort the transaction and log the error
            console.error('Failed to delete tutor and related data:', error);
            if (session) {
                console.log("Aborting transaction");
                await session.abortTransaction();
            }
            return { success: false, message: 'Failed to delete account. Please try again later.', error: error };
        } finally {
            if (session) {
                console.log("Ending session");
                session.endSession();
            }
        }
        return { success: true, message: 'Account deleted successfully.' };
    }


}

module.exports = AuthenticationServices;

