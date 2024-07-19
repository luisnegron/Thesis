const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationController');

router.get('/evaluations/:period', evaluationController.getEvaluationsByPeriod);

module.exports = router;