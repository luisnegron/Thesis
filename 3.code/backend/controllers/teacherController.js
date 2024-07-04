// controllers/teacherController.js
const Teacher = require('../models/teacher');

async function getTeachers(req, res) {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    console.error('Error al obtener profesores:', error);
    res.status(500).json({ mensaje: 'Error al obtener profesores' });
  }
}

async function getTeacherById(req, res) {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ mensaje: 'Profesor no encontrado' });
    }
    res.status(200).json(teacher);
  } catch (error) {
    console.error('Error al obtener profesor:', error);
    res.status(500).json({ mensaje: 'Error al obtener profesor' });
  }
}

async function createTeacher(req, res) {
  try {
    const { cedula, name, apellido, direccion, telefono, email, qualification, subject } = req.body;
    
    const lastTeacher = await Teacher.findOne().sort({ nro: -1 });
    const nro = lastTeacher ? lastTeacher.nro + 1 : 1;

    const newTeacher = new Teacher({ nro, cedula, name, apellido, direccion, telefono, email, qualification, subject});
    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    console.error('Error al crear profesor:', error);
    res.status(500).json({ mensaje: 'Error al crear profesor' });
  }
}

async function updateTeacher(req, res) {
  try {
    const { id } = req.params;
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedTeacher);
  } catch (error) {
    console.error('Error al actualizar profesor:', error);
    res.status(500).json({ mensaje: 'Error al actualizar profesor' });
  }
}

async function deleteTeacher(req, res) {
  try {
    const { id } = req.params;
    await Teacher.findByIdAndDelete(id);
    res.status(200).json({ mensaje: 'Profesor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar profesor' });
  }
}

async function deactivateTeacher(req, res) {
  try {
    const { id } = req.params;
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, { activo: false }, { new: true });
    res.status(200).json(updatedTeacher);
  } catch (error) {
    console.error('Error al borrar profesor:', error);
    res.status(500).json({ mensaje: 'Error al borrar profesor', error: error.message });
  }
}

module.exports = {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  deactivateTeacher
};