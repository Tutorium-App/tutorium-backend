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
            // Find the tutor by ID
            const tutor = await tutorModel.findOne({ tutorID });

            if (!tutor) {
                throw new Error("Tutor not found");
            }

            // Calculate new rating
            const oldRating = tutor.rating || 0; // default to 0 if no rating exists yet
            const totalRatings = tutor.numberOfRatings || 0; // default to 0 if no ratings exist yet
            const newRatingCount = totalRatings + 1;
            const newAverageRating = (oldRating * totalRatings + newRating) / newRatingCount;

            // Update tutor's rating properties
            tutor.rating = newAverageRating;
            tutor.numberOfRatings = newRatingCount;

            // Save tutor object back to the database
            await tutor.save();
        } catch (error) {
            console.error("Error updating tutor rating:", error);
            throw error;
        }
    }
}

module.exports = ReviewServices;
