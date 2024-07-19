const Report = require('../models/report');

exports.getReportByTeacherAndPeriod = async (req, res) => {
  try {
    const { teacherId, period } = req.params;
    const report = await Report.findOne({ teacherId, period });
    
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching report', error });
  }
};

exports.createReport = async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error creating report', error });
  }
};