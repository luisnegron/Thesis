// models/student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  nro: {
    type: Number,
    required: true,
    unique: true
  },
  cedula: {
    type: String,
    required: false,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: false
  },
  direccion: {
    type: String,
    required: false
  },
  telefono: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  grado: {
    type: String,
    required: false
  },
  activo: {
    type: Boolean,
    default: true
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;