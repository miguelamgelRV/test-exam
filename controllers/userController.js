const userModel = require('../models/userModel');

// Controlador para obtener usuarios
const getUsers = (req, res) => {
  userModel.getUsers((err, users) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los usuarios. ' + err });
    }
    res.json(users);
  });
};

// Controlador para crear un usuario
const createUser = (req, res) => {
  const user = req.body;
  if (!user.name || !user.email) {
    return res.status(400).json({ error: 'Nombre y correo son obligatorios.' });
  }

  userModel.createUser(user, (err, newUser) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear el usuario.' });
    }
    res.status(201).json(newUser);
  });
};

module.exports = {
  getUsers,
  createUser,
};
