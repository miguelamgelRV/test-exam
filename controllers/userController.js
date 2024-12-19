const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

class UserController {
  async createUser(req, res) {
    const { name, email, password } = req.body;
    try {
      const user = await User.createUser(name, email, password);
      res.status(201).json({ id: user.id, name: user.name, email: user.email });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await User.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.model.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: 'Usuario no encontrado' });
      }

      const isPasswordValid = await User.checkPassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Contraseña incorrecta' });
      }

      // Crear el token JWT
      const token = jwt.sign({ id: user.id, email: user.email }, 'secretKey', { expiresIn: '1h' });

      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async authenticate(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
    if (!token) {
      return res.status(403).json({ error: 'Token no proporcionado' });
    }

    try {
      const decoded = jwt.verify(token, 'secretKey'); // Verificar el token
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }
  }
}

module.exports = new UserController();