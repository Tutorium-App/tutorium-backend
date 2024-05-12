const router = require('express').Router();
const historyController = require('../controllers/history.controller');

// fetch all histories
router.get('/fetchAllHistory', historyController.fetchAllHistory);

// create or add to history
router.get('/createHistory', historyController.createHistory);

module.exports = router;

//* Define the various routes to the server in this file
