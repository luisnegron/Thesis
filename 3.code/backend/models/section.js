// models/section.js
const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  nro: {
    type: Number,
    required: true,
    unique: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  period: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  active: {
    type: Boolean,
    default: true
  }
});

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;