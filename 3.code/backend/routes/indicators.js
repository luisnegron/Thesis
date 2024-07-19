// routes/indicators.js
const express = require('express');
const router = express.Router();
const indicatorController = require('../controllers/indicatorController');

router.get('/', indicatorController.getIndicators);
router.get('/:id', indicatorController.getIndicatorById);
router.post('/', indicatorController.createIndicator);
router.put('/:id', indicatorController.updateIndicator);
router.delete('/:id', indicatorController.deleteIndicator);

module.exports = router;