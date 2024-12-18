const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas para usuarios
router.get('/get-user', userController.getUsers);
router.post('/set-user', userController.createUser);

module.exports = router;