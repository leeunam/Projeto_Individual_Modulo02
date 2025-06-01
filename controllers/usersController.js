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

    console.log('Tentativa de login:', { email });

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

    console.log('Login bem-sucedido para:', email);
    res.redirect('/eventos');
  } catch (error) {
    console.error('Erro no login:', error);
    res.render('pages/login', {
      error: 'Erro interno do servidor. Tente novamente.',
    });
  }
};

const showRegister = (req, res) => {
  res.render('pages/registrar', { error: null, success: null });
};

const processRegister = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    console.log('Dados recebidos para registro:', { name, email, role });

    if (!name || !email || !password || !role) {
      return res.render('pages/registrar', {
        error: 'Todos os campos são obrigatórios.',
        success: null,
      });
    }

    if (role !== 'organizador' && role !== 'participante') {
      return res.render('pages/registrar', {
        error: 'Tipo de usuário inválido. Escolha Organizador ou Participante.',
        success: null,
      });
    }

    const existingUser = await usersModel.findByEmail(email);
    if (existingUser) {
      console.log('Email já existe:', email);
      return res.render('pages/registrar', {
        error: 'Este email já está cadastrado. Use outro email ou faça login.',
        success: null,
      });
    }

    console.log('Criando novo usuário...');
    const newUser = await usersModel.create({ name, email, password, role });
    console.log('Usuário criado com sucesso:', newUser.id);

    console.log('Redirecionando para /eventos...');
    res.redirect('/eventos');
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.render('pages/registrar', {
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
};
