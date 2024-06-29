// routes/users.js
var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

// Ruta para registrar un nuevo usuario
router.post('/register', userController.userRegister);
router.post('/login', userController.login);
router.get('/profile', authMiddleware.verificarToken, userController.obtainProfile);
router.get('/list-users', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), userController.obtainUsers);
router.delete('/drop/:id', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), userController.dropUser);
router.put('/change-role/:id', authMiddleware.verificarToken, authMiddleware.verificarRol(['administrator']), userController.changeRole);

module.exports = router;
