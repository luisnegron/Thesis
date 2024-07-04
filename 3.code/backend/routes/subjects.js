// routes/subjects.js
const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), subjectController.getSubjects);
router.get('/:id', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), subjectController.getSubjectById);
router.post('/', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), subjectController.createSubject);
router.put('/:id', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), subjectController.updateSubject);
router.delete('/:id', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), subjectController.deleteSubject);
router.put('/deactivate/:id', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), subjectController.deactivateSubject);

module.exports = router;