// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. Token de autorización no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], 'secreto');
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ mensaje: 'Token de autorización inválido' });
  }
}

function verificarRol(rolesPermitidos) {
    return function (req, res, next) {
      const user = req.user;
  
      if (!user || !rolesPermitidos.includes(user.role)) {
        return res.status(403).json({ mensaje: 'Acceso denegado. No tienes permiso para acceder a esta ruta' });
      }
  
      next();
    };
  }

module.exports = {
  verificarToken,
  verificarRol
};