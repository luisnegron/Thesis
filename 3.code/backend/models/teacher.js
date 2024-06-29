const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
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
  qualification: {
    type: String,
    required: false
  }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;