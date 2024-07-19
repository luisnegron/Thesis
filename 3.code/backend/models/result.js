const mongoose = require('mongoose');

const resultsSchema = new mongoose.Schema({
  period: {
    type: String,
    required: true
  },
  results: [{
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true
    },
    reportDetails: {
      type: Object,
      required: true
    }
  }]
});

module.exports = mongoose.model('Results', resultsSchema);