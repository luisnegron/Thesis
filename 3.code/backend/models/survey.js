const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['Encuesta', 'Examen'] // Asegúrate de que estos valores coincidan con los enviados desde el frontend
  },
  date: { type: Date, required: true },
  status: { 
    type: String, 
    required: true, 
    enum: ['Activo', 'Inactivo'] // Asegúrate de que estos valores coincidan con los enviados desde el frontend
  },
  period: { type: String, required: true },
  instructions: { type: String, required: true }
});

module.exports = mongoose.model('Survey', surveySchema);