const router = require('express').Router();
const searchController = require('../controllers/search.controller');

// fetch all tutorial services and videos for search operation
router.get('/fetchAllTutorials', searchController.fetchAllTutorials);

module.exports = router;

//* Define the various routes to the server in this file
 