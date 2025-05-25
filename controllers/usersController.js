const usersModel = require('../models/usersModels');

const getAllUsers = async (req, res) => {
  try {
    const users = await usersModel.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsersById = async (req, res) => {
  try {
    const users = await usersModel.getById(req.params.id);
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUsers = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUsers = await usersModel.create({name, email, password, role});
    res.status(201).json(newUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUsers = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const updatedUsers = await usersModel.update(req.params.id, {name, email, password, role});
    if (updatedUsers) {
      res.status(200).json(updatedUsers);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const deletedUsers = await usersModel.delete(req.params.id);
    if (deletedUsers) {
      res.status(200).json(deletedUsers);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers
};