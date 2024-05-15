const reviewModel = require('../models/reviews.model');
const tutorModel = require('../models/tutor.model');

class ReviewServices {
    // Fetch reviews using a tutorID
    static async fetchReviews(tutorID) {
        try {
            const reviews = await reviewModel.find({ tutorID: tutorID });
            return reviews;
        } catch (error) {
            console.error("Error fetching reviews:", error);
            throw error; // Re-throw the error to be handled by the controller
        }
    }

    // Create a new review
    static async createReview(tutorialID, tutorID, studentName, studentYear, tutorialTitle, rating, comment, profilePhotoLink) {
        try {
            const newReview = new reviewModel({
                tutorID,
                tutorialID,
                studentName,
                studentYear,
                tutorialTitle,
                rating,
                comment,
                profilePhotoLink
            });
            await newReview.save();

            // Update tutor's rating
            await this.updateTutorRating(tutorID, rating);

            return newReview;
        } catch (error) {
            console.error("Error creating review:", error);
            throw error;
        }
    }

    // Function to update tutor's rating
    static async updateTutorRating(tutorID, newRating) {
        try {
            const filter = { tutorID };
            const tutor = await tutorModel.findOne(filter);

            if (!tutor) {
                throw new Error("Tutor not found");
            }

            const oldRating = tutor.rating || 0;
            const totalRatings = tutor.numberOfRatings || 0;
            const newRatingCount = totalRatings + 1;
            const newAverageRating = (oldRating * totalRatings + newRating) / newRatingCount;

            const update = {
                $inc: { numberOfRatings: 1 },
                $set: { rating: newAverageRating }
            };

            const result = await tutorModel.updateOne(filter, update);

            if (result.nModified === 0) {
                throw new Error("Failed to update tutor rating");
            }
        } catch (error) {
            console.error("Error updating tutor rating:", error);
            throw error;
        }
    }
}

module.exports = ReviewServices;
