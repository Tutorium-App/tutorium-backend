const router = require('express').Router();

const appDataController = require('../controllers/appData.controller');

//loading appData
router.get('/loadAppData', appDataController.loadAppData);

//create appData
router.post('/createAppData', appDataController.createAppData);
 
module.exports = router;

