// models/area.js
const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // Otros campos según sea necesario
});

const Area = mongoose.model('Area', areaSchema);

module.exports = Area;