// controllers/usuarioController.js
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

async function userRegister(req, res) {
  try {
    const { name, email, password, role } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ mensaje: 'El correo electrónico ya está en uso' });
    }

    // Hash de la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = new User({
      name,
      email,
      password: passwordHash,
      role
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}

async function login(req, res) {
    try {
      const { email, password } = req.body;
  
      // Buscar al usuario por correo electrónico en la base de datos
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      // Comparar la contraseña proporcionada con la contraseña almacenada
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
      }

      // Generar el token de autenticación
      const token = jwt.sign({ user: { id: user._id, role: user.role } }, 'secreto', { expiresIn: '1h' });
  
      // Enviar una respuesta exitosa con información del usuario
      res.status(200).json({ mensaje: 'Inicio de sesión exitoso', token, user });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  async function obtainProfile(req, res) {
    try {
      const userId = req.user.id; // Suponiendo que el ID del usuario se almacena en el token de autenticación
      const user = await User.findById(userId);
  
      res.status(200).json({ user });
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  async function obtainUsers(req, res) {
    try {
      // Obtener la lista de usuarios desde la base de datos
      const users = await User.find({}, 'name email role');
      res.status(200).json({ users });
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  async function dropUser(req, res) {
    try {
      const { id } = req.params;
  
      // Verificar si el usuario existe en la base de datos
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      // Eliminar al usuario de la base de datos
      await User.findByIdAndDelete(id);
      res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  async function changeRole(req, res) {
    try {
      const { id } = req.params;
      const { newRol } = req.body;
  
      // Verificar si el usuario existe en la base de datos
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      // Cambiar el rol del usuario
      user.role = newRol;
      await user.save();
  
      res.status(200).json({ mensaje: 'Rol de usuario cambiado correctamente', user });
    } catch (error) {
      console.error('Error al cambiar el rol del usuario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

module.exports = {
    userRegister,
    login,
    obtainProfile,
    obtainUsers,
    dropUser,
    changeRole
};