const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/users', usersController.createUsers);
router.get('/users', usersController.getAllUsers);
router.get('/users/:id', usersController.getUsersById);
router.put('/users/:id', usersController.updateUsers);
router.delete('/users/:id', usersController.deleteUsers);

router.get('/login', usersController.showLogin);
router.post('/login', usersController.processLogin);
router.get('/register', usersController.showRegister);
router.post('/register', usersController.processRegister);

module.exports = router;
