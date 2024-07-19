const Section = require('../models/section');
const Student = require('../models/student');

async function getSections(req, res) {
  try {
    const sections = await Section.find().populate('teacher').populate('subject');
    res.status(200).json(sections);
  } catch (error) {
    console.error('Error fetching sections:', error);
    res.status(500).json({ message: 'Error fetching sections' });
  }
}

async function getSectionById(req, res) {
  try {
    const { id } = req.params;
    const section = await Section.findById(id).populate('teacher').populate('subject');
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    res.status(200).json(section);
  } catch (error) {
    console.error('Error fetching section:', error);
    res.status(500).json({ message: 'Error fetching section' });
  }
}

async function createSection(req, res) {
  try {
    const { teacher, subject, period, code, name } = req.body;

    const lastSection = await Section.findOne().sort({ nro: -1 });
    const nro = lastSection ? lastSection.nro + 1 : 1;

    const newSection = new Section({ nro, teacher, subject, period, code, name });
    await newSection.save();
    res.status(201).json(newSection);
  } catch (error) {
    console.error('Error creating section:', error);
    res.status(500).json({ message: 'Error creating section' });
  }
}

async function updateSection(req, res) {
    try {
      const { id } = req.params;
      const updatedSection = await Section.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedSection);
    } catch (error) {
      console.error('Error al actualizar el Paralelo:', error);
      res.status(500).json({ mensaje: 'Error al actualizar el paralelo' });
    }
  }

  async function deleteSection(req, res) {
    try {
      const { id } = req.params;
      await Section.findByIdAndDelete(id);
      res.status(200).json({ mensaje: 'paralelo eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar el paralelo' });
    }
  }
  
  async function deactivateSection(req, res) {
    try {
      const { id } = req.params;
      const updatedSection = await Section.findByIdAndUpdate(id, { active: false }, { new: true });
      res.status(200).json(updatedSection);
    } catch (error) {
      console.error('Error deactivating section:', error);
      res.status(500).json({ message: 'Error deactivating section' });
    }
  }
  
  /*async function getStudentsBySection(req, res) {
    try {
      const { id } = req.params;
      const section = await Section.findById(id).populate('students');
      res.status(200).json(section.students);
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ message: 'Error fetching students' });
    }
  }*/

  /*async function getSectionStudents(req, res) {
    try {
      const { id } = req.params;
      const section = await Section.findById(id).populate('students');
      if (!section) {
        return res.status(404).json({ message: 'Section not found' });
      }
      const students = await Student.find({ _id: { $in: section.students }, active: true });
      res.status(200).json(students);
    } catch (error) {
      console.error('Error fetching section students:', error);
      res.status(500).json({ message: 'Error fetching section students' });
    }
  }*/

    async function addStudentsToSection(req, res) {
      try {
        const { id } = req.params;
        const { studentIds } = req.body;
    
        const section = await Section.findById(id);
        if (!section) {
          return res.status(404).json({ message: 'Section not found' });
        }

        // Verificar si algún estudiante ya está en la sección
    const existingStudents = section.students;
    const newStudents = studentIds.filter(studentId => !existingStudents.includes(studentId));

    // Verificar si el estudiante ya está en otras secciones
    const studentsInOtherSections = await Section.find({
      _id: { $ne: id },
      students: { $in: studentIds }
    }).distinct('students');

    // Combina los estudiantes que ya están en otras secciones
    const duplicates = studentIds.filter(studentId =>
      studentsInOtherSections.includes(studentId)
    );

    if (duplicates.length > 0) {
      return res.status(400).json({ message: `Students already enrolled in other sections: ${duplicates.join(', ')}` });
    }
    
        section.students.push(...studentIds);
        await section.save();
    
        res.status(200).json({ message: 'Students added to section successfully' });
      } catch (error) {
        console.error('Error adding students to section:', error);
        res.status(500).json({ message: 'Error adding students to section' });
      }
    }
    
    async function getSectionStudents(req, res) {
      try {
        const { id } = req.params;
        const section = await Section.findById(id).populate('students');
        if (!section) {
          return res.status(404).json({ message: 'Section not found' });
        }
        res.status(200).json(section.students);
      } catch (error) {
        console.error('Error fetching section students:', error);
        res.status(500).json({ message: 'Error fetching section students' });
      }
    }

    
module.exports = {
  getSections,
  getSectionById,
  createSection,
  updateSection,
  deactivateSection,
  //getStudentsBySection,
  addStudentsToSection,
  getSectionStudents
};
