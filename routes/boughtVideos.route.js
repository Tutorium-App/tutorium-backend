const router = require('express').Router();

const boughtVideosController = require('../controllers/boughtVideos.controller');


//loading bought videos
router.get('/loadBoughtVideos', boughtVideosController.loadBoughtVideos);

// create a bought video
router.get('/createBoughtVideo', boughtVideosController.createBoughtVideo);
 
module.exports = router;

