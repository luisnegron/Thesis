// routes/subjects.js
const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), sectionController.getSections);
router.get('/:id', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), sectionController.getSectionById);
router.post('/', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), sectionController.createSection);
router.put('/:id', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), sectionController.updateSection);
//router.delete('/:id', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), sectionController.deleteSection);
router.put('/deactivate/:id', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), sectionController.deactivateSection);
router.get('/:id/students', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), sectionController.getSectionStudents);
router.put('/:id/add-students', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), sectionController.addStudentsToSection);

module.exports = router;