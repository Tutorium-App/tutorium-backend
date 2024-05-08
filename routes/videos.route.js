const router = require('express').Router();
const videosController = require('../controllers/videos.controller');

// fetch all videos
router.get('/fetchAllVideos', videosController.fetchAllVideos);

// fetch popular Videos
router.get('/fetchPopularVideos', videosController.fetchPopularVideos);

// fetch Videos by tutor id
router.get('/fetchTutorVideos', videosController.fetchTutorVideos);

// add student bought tutorial videos
router.post('/storeStudentVideo', videosController.storeStudentVideo);

// fetch student's bought videos
router.get('/fetchStudentVideos', videosController.fetchStudentVideos);


module.exports = router;

//* Define the various routes to the server in this file
