const router = require('express').Router();

const callbackController = require('../controllers/callback.controller');

// handle paystack callback
router.post('/handleCallback', callbackController.handlePaystackCallback);
 
module.exports = router;

