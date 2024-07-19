const Evaluation = require('../models/evaluation');

// Obtener evaluaciones por período
exports.getEvaluationsByPeriod = async (req, res) => {
  try {
    const period = req.params.period;
    const evaluations = await Evaluation.find({ period }).populate('surveyId').populate('results.studentId');
    res.status(200).json(evaluations);
  } catch (error) {
    console.error('Error fetching evaluations:', error);
    res.status(500).json({ message: 'Error fetching evaluations' });
  }
};