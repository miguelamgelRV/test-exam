const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const CostumersController = require('../controllers/costumersController');

router.post('/login', UserController.loginUser);  

router.get('/users', UserController.authenticate, UserController.getAllUsers); 
router.post('/users', UserController.authenticate, UserController.createUser); 

router.get('/costumers', UserController.authenticate, CostumersController.getAllCostumers); 
router.post('/costumers', UserController.authenticate, CostumersController.createCostumer); 
router.put('/costumers', UserController.authenticate, CostumersController.updateCustomer); 
router.patch('/costumers', UserController.authenticate, CostumersController.deleteCustomer); 

module.exports = router;