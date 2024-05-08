const router = require('express').Router();
const servicesController = require('../controllers/services.controller');

// fetch all services
router.get('/fetchAllServices', servicesController.fetchAllServices);

// fetch popular services
router.get('/fetchPopularServices', servicesController.fetchPopularServices);

// fetch services by tutor id
router.get('/fetchTutorServices', servicesController.fetchTutorServices);

module.exports = router;

//* Define the various routes to the server in this file
