// models/subject.js
const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  nro: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  hours: {
    type: Number,
    required: true
  },
  activo: {
    type: Boolean,
    default: true
  }
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;