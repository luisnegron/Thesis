const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/:teacherId/:period', reportController.getReportByTeacherAndPeriod);
router.post('/', reportController.createReport);

module.exports = router;