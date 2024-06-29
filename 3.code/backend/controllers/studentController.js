// controllers/studentController.js
const Student = require('../models/student');

async function getStudents(req, res) {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener estudiantes' });
  }
}

async function getStudentById(req, res) {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error('Error al obtener estudiante:', error);
    res.status(500).json({ mensaje: 'Error al obtener estudiante' });
  }
}

async function createStudent(req, res) {
  try {
    const { cedula, name, apellido, direccion, telefono, email, grado } = req.body;
    
    const lastStudent = await Student.findOne().sort({ nro: -1 });
    const nro = lastStudent ? lastStudent.nro + 1 : 1;

    const newStudent = new Student({ nro, cedula, name, apellido, direccion, telefono, email, grado });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error al crear estudiante:', error);
    res.status(500).json({ mensaje: 'Error al crear estudiante' });
  }
}

async function updateStudent(req, res) {
  try {
    const { id } = req.params;
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error('Error al actualizar estudiante:', error);
    res.status(500).json({ mensaje: 'Error al actualizar estudiante' });
  }
}

async function deleteStudent(req, res) {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.status(200).json({ mensaje: 'Estudiante eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar estudiante' });
  }
}

async function deactivateStudent(req, res) {
  try {
    const { id } = req.params;
    const updatedStudent = await Student.findByIdAndUpdate(id, { activo: false }, { new: true });
    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error('Error al desactivar estudiante:', error);
    res.status(500).json({ mensaje: 'Error al desactivar estudiante', error: error.message });
  }
}

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  deactivateStudent
};