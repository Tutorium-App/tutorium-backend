const router = require('express').Router();
const videosController = require('../controllers/videos.controller');

// fetch all videos
router.get('/fetchAllVideos', videosController.fetchAllVideos);

// fetch popular Videos
router.get('/fetchPopularVideos', videosController.fetchPopularVideos);

// fetch Videos by tutor id
router.get('/fetchTutorVideos', videosController.fetchTutorVideos);


module.exports = router;

//* Define the various routes to the server in this file
