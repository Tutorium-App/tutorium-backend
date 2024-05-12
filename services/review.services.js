const reviewModel = require('../models/review.model');

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
            return newReview;
        } catch (error) {
            console.error("Error creating review:", error);
            throw error;
        }
    }
}

module.exports = ReviewServices;
