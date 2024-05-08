const router = require('express').Router();

const adsController = require('../controllers/ads.controller');


//loading ads
router.get('/loadAds', adsController.loadAds);
 
module.exports = router;

