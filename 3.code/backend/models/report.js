const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  period: {
    type: String,
    required: true
  },
  reportDetails: {
    type: Object,
    required: true
  }
});

module.exports = mongoose.model('Report', reportSchema);