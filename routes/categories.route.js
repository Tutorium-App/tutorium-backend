const router = require('express').Router();
const categoriesController = require('../controllers/categories.controller');

// fetch academics category
router.get('/fetchAcademics', categoriesController.fetchAcademics);

// fetch skills category
router.get('/fetchSkills', categoriesController.fetchSkills);

// fetch others category
router.get('/fetchOthers', categoriesController.fetchOthers);


module.exports = router;

//* Define the various routes to the server in this file
