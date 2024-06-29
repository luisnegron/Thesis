// routes/students.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), studentController.getStudents);
router.get('/:id', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), studentController.getStudentById);
router.post('/', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), studentController.createStudent);
router.put('/:id', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), studentController.updateStudent);
router.delete('/:id', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), studentController.deleteStudent);
router.put('/deactivate/:id', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), studentController.deactivateStudent);

module.exports = router;