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

const showLogin = (req, res) => {
  res.render('pages/login', { error: null });
};

const processLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usersModel.findByEmail(email);

    if (!user) {
      return res.render('pages/login', {
        error:
          'Usuário não encontrado. Clique em "Cadastre-se" para criar uma conta.',
      });
    }

    if (user.password !== password) {
      return res.render('pages/login', {
        error: 'Senha incorreta. Tente novamente.',
      });
    }

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.redirect('/eventos');
  } catch (error) {
    res.render('pages/login', {
      error: 'Erro interno do servidor. Tente novamente.',
    });
  }
};

const showRegister = (req, res) => {
  res.render('pages/register', { error: null, success: null });
};

const processRegister = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    console.log('Dados recebidos para registro:', { name, email, role });

    if (!name || !email || !password || !role) {
      return res.render('pages/register', {
        error: 'Todos os campos são obrigatórios.',
        success: null,
      });
    }

    if (role !== 'organizador' && role !== 'participante') {
      return res.render('pages/register', {
        error: 'Tipo de usuário inválido. Escolha Organizador ou Participante.',
        success: null,
      });
    }

    const existingUser = await usersModel.findByEmail(email);
    if (existingUser) {
      return res.render('pages/register', {
        error: 'Este email já está cadastrado. Use outro email ou faça login.',
        success: null,
      });
    }

    const newUser = await usersModel.create({ name, email, password, role });
    req.session.user = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    res.redirect('/eventos');
  } catch (error) {
    res.render('pages/register', {
      error:
        'Erro ao criar usuário. Tente novamente. Detalhes: ' + error.message,
      success: null,
    });
  }
};

const createUsers = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUsers = await usersModel.create({ name, email, password, role });
    res.status(201).json(newUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUsers = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const updatedUsers = await usersModel.update(req.params.id, {
      name,
      email,
      password,
      role,
    });
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

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erro ao fazer logout:', err);
      return res.status(500).json({ error: 'Erro ao fazer logout' });
    }
    res.redirect('/login');
  });
};

const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};

module.exports = {
  getAllUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers,
  showRegister,
  showLogin,
  processLogin,
  processRegister,
  logout,
  requireAuth,
};
