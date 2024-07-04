// routes/teachers.js
const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), teacherController.getTeachers);
router.get('/:id', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), teacherController.getTeacherById);
router.post('/', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), teacherController.createTeacher);
router.put('/:id', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), teacherController.updateTeacher);
router.delete('/:id', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), teacherController.deleteTeacher);
router.put('/deactivate/:id', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), teacherController.deactivateTeacher);

module.exports = router;