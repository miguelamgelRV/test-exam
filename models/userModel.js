const db = require('../config/db');

// Función para obtener usuarios
const getUsers = (callback) => {
  const query = 'SELECT * FROM users';
  db.all(query, [], (err, rows) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, rows);
  });
};

// Función para crear un nuevo usuario
const createUser = (user, callback) => {
  const { name, email } = user;
  const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.run(query, [name, email], function (err) {
    if (err) {
      return callback(err, null);
    }
    callback(null, { id: this.lastID, ...user });
  });
};

module.exports = {
  getUsers,
  createUser,
};
