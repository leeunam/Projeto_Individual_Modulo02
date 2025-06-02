const addressModel = require('../models/addressModel');

const getAllAddress = async (req, res) => {
  try {
    const address = await addressModel.getAll();
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAddressById = async (req, res) => {
  try {
    const address = await addressModel.getById(req.params.id);
    if (address) {
      res.status(200).json(address);
    } else {
      res.status(404).json({ error: 'Endereço não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createAddress = async (req, res) => {
  try {
    const { street, number, district, cep } = req.body;
    const newAddress = await addressModel.create({
      street,
      number,
      district,
      cep,
    });
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { street, number, district, cep } = req.body;
    const updatedAddress = await addressModel.update(req.params.id, {
      street,
      number,
      district,
      cep,
    });
    if (updatedAddress) {
      res.status(200).json(updatedAddress);
    } else {
      res.status(404).json({ error: 'Endereço não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const deletedAddress = await addressModel.delete(req.params.id);
    if (deletedAddress) {
      res.status(200).json(deletedAddress);
    } else {
      res.status(404).json({ error: 'Endereço não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const showAddressForm = (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  res.render('pages/adicionarEndereco', {
    error: null,
    success: null,
  });
};

const createAddressAndRedirect = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    const { street, number, district, cep } = req.body;

    if (!street || !number || !district || !cep) {
      return res.render('pages/adicionarEndereco', {
        error: 'Todos os campos são obrigatórios.',
        success: null,
      });
    }

    const newAddress = await addressModel.create({
      street,
      number: parseInt(number),
      district,
      cep,
    });

    req.session.selectedAddress = newAddress;

    res.redirect('/criarEvento');
  } catch (error) {
    res.render('pages/adicionarEndereco', {
      error: 'Erro ao criar endereço: ' + error.message,
      success: null,
    });
  }
};

module.exports = {
  getAllAddress,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
  showAddressForm,
  createAddressAndRedirect,
};
