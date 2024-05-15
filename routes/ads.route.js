const router = require('express').Router();

const adsController = require('../controllers/ads.controller');


//loading ads
router.get('/loadAds', adsController.loadAds);

// count ads click
router.post('/countClick', adsController.countClick);
 
module.exports = router;

