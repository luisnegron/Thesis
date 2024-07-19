const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
  surveyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey', required: true },
  period: { type: String, required: true },
  results: [
    {
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
      score: { type: Number, required: true }
    }
  ]
});

module.exports = mongoose.model('Evaluation', evaluationSchema);