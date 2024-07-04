// controllers/subjectController.js
const Subject = require('../models/subject');

async function getSubjects(req, res) {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener materias' });
  }
}

async function getSubjectById(req, res) {
  try {
    const { id } = req.params;
    const subject = await Subject.findById(id);
    if (!subject) {
      return res.status(404).json({ mensaje: 'materia no encontrado' });
    }
    res.status(200).json(subject);
  } catch (error) {
    console.error('Error al obtener materia:', error);
    res.status(500).json({ mensaje: 'Error al obtener materia' });
  }
}

async function createSubject(req, res) {
  try {
    const { name, category, level, code, hours } = req.body;
    
    const lastSubject = await Subject.findOne().sort({ nro: -1 });
    const nro = lastSubject ? lastSubject.nro + 1 : 1;

    const newSubject = new Subject({ nro, name, category, level, code, hours });
    await newSubject.save();
    res.status(201).json(newSubject);
  } catch (error) {
    console.error('Error al crear materia:', error);
    res.status(500).json({ mensaje: 'Error al crear materia' });
  }
}

async function updateSubject(req, res) {
  try {
    const { id } = req.params;
    const updatedSubject = await Subject.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedSubject);
  } catch (error) {
    console.error('Error al actualizar materia:', error);
    res.status(500).json({ mensaje: 'Error al actualizar materia' });
  }
}

async function deleteSubject(req, res) {
  try {
    const { id } = req.params;
    await Subject.findByIdAndDelete(id);
    res.status(200).json({ mensaje: 'materia eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar materia' });
  }
}

async function deactivateSubject(req, res) {
  try {
    const { id } = req.params;
    const updatedSubject = await Subject.findByIdAndUpdate(id, { activo: false }, { new: true });
    res.status(200).json(updatedSubject);
  } catch (error) {
    console.error('Error al desactivar materia:', error);
    res.status(500).json({ mensaje: 'Error al desactivar materia', error: error.message });
  }
}

module.exports = {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
  deactivateSubject
};