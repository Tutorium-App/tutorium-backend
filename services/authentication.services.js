const tutorModel = require('../models/tutor.model');
const paymentModel = require('../models/payment.model');
const pendingTutorialModel = require('../models/pendingTutorials.model');
const reviewModel = require('../models/reviews.model');
const tutorialRequestModel = require('../models/tutorialRequest.model');
const tutorialServiceModel = require('../models/tutorialService.model');
const tutorialVideoModel = require('../models/tutorialVideo.model');

const connection = require('../config/db');

const mongoose = require('mongoose');


class AuthenticationServices {
    //function to store tutor data into database
    static async storeTutorData(tutorID, fullName, email, phone, dateCreated, school, program, year, profilePhotoLink) {
        var verified = "false";
        var rating = 1;
        var balance = 0;
        var numberOfServices = 0;
        var numberOfVideos = 0;
        var about = "";

        const tutorData = new tutorModel({ tutorID, fullName, email, phone, dateCreated, school, program, year, profilePhotoLink, verified, rating, balance, about, numberOfVideos, numberOfServices });
        return await tutorData.save();
    }


    //function to delete user account from the database
    static async deleteAccount(tutorID) {
        let session = null;
        try {
            // Start a session and transaction for atomic operations
            console.log("Starting transaction for deleting account");
            session = await connection.startSession();
            session.startTransaction();
            console.log("Transaction started");

            // Delete tutor in all related collections
            await tutorModel.deleteOne({ tutorID: tutorID }, { session });
            console.log("Deleted tutor data");
            await paymentModel.deleteMany({ tutorID: tutorID }, { session });
            console.log("Deleted payment data");
            await pendingTutorialModel.deleteMany({ tutorID: tutorID }, { session });
            console.log("Deleted pending tutorial data");
            await reviewModel.deleteMany({ tutorID: tutorID }, { session });
            console.log("Deleted review data");
            await tutorialRequestModel.deleteMany({ tutorID: tutorID }, { session });
            console.log("Deleted tutorial request data");
            await tutorialServiceModel.deleteMany({ tutorID: tutorID }, { session });
            console.log("Deleted tutorial service data");
            await tutorialVideoModel.deleteMany({ tutorID: tutorID }, { session });
            console.log("Deleted tutorial video data");

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

