const router = require('express').Router();

const rankController = require('../controllers/rank.controller');


//fetch rank
router.get('/fetchRank', rankController.fetchRank);
 
module.exports = router;

