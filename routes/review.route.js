const router = require('express').Router();
const reviewController = require('../controllers/review.controller');

// fetch all reviews
router.get('/fetchReviews', reviewController.fetchReviews);

// create a review
router.post('/createReview', reviewController.createReview); 

module.exports = router;

//* Define the various routes to the server in this file
