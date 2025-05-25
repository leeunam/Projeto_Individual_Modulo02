const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/users', usersController.createUsers);
router.get('/users', usersController.getAllUsers);
router.get('/users/:id', usersController.getUsersById);
router.put('/users/:id', usersController.updateUsers);
router.delete('/users/:id', usersController.deleteUsers);

module.exports = router;