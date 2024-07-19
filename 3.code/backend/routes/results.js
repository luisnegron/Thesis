const express = require('express');
const router = express.Router();
const resultsController = require('../controllers/resultController');

router.get('/:period', resultsController.getResultsByPeriod);
router.post('/', resultsController.createResults);

module.exports = router;