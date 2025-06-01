const eventsModel = require('../models/eventsModel');
const addressModel = require('../models/addressModel');
const db = require('../config/db');

const getAllEvents = async (req, res) => {
  try {
    const events = await eventsModel.getAllWithDetails();
    res.render('pages/eventos', { events });
  } catch (error) {
    console.error('Erro ao carregar eventos:', error);
    res.render('pages/eventos', { events: [] });
  }
};

const getEventsById = async (req, res) => {
  try {
    const events = await eventsModel.getById(req.params.id);
    if (events) {
      res.status(200).json(events);
    } else {
      res.status(404).json({ error: 'Evento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const showCreateEventPage = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.render('pages/criarEvento', {
        error:
          'Você precisa estar logado para criar um evento. Faça login primeiro.',
        success: null,
        events: null,
        selectedAddress: null,
      });
    }

    res.render('pages/criarEvento', {
      error: null,
      success: null,
      events: null,
      selectedAddress: req.session.selectedAddress || null,
    });
  } catch (error) {
    res.render('pages/criarEvento', {
      error: 'Erro ao carregar a página.',
      success: null,
      events: null,
      selectedAddress: null,
    });
  }
};

const createEvents = async (req, res) => {
  try {
    console.log('=== INÍCIO CRIAÇÃO DE EVENTO ===');
    console.log('Dados do corpo da requisição:', req.body);
    console.log('Sessão do usuário:', req.session.user);
    console.log('Endereço selecionado:', req.session.selectedAddress);

    if (!req.session.user) {
      console.log('Usuário não logado, redirecionando...');
      return res.redirect('/login');
    }

    const { name, event_date, event_time, description } = req.body;
    console.log('Campos extraídos:', {
      name,
      event_date,
      event_time,
      description,
    });

    if (!name || !event_date || !event_time || !description) {
      return res.render('pages/criarEvento', {
        error: 'Todos os campos do evento são obrigatórios.',
        success: null,
        events: null,
        selectedAddress: req.session.selectedAddress || null,
      });
    }

    if (!req.session.selectedAddress) {
      return res.render('pages/criarEvento', {
        error:
          'Você deve adicionar uma localização para o evento. Clique em "Adicionar Localização".',
        success: null,
        events: null,
        selectedAddress: null,
      });
    }

    const user_id = req.session.user.id;
    const address_id = req.session.selectedAddress.id;

    console.log('Dados para criação do evento:', {
      name,
      user_id,
      address_id,
      event_date,
      event_time,
      description,
    });

    const newEvent = await eventsModel.create({
      name,
      user_id,
      address_id,
      event_date,
      event_time,
      description,
    });

    console.log('✅ Evento criado com sucesso:', newEvent);

    req.session.success = 'Evento criado com sucesso!';

    res.render('pages/gerenciar');
  } catch (error) {
    res.render('pages/criarEvento', {
      error: 'Erro ao criar evento: ' + error.message,
      success: null,
      events: null,
      selectedAddress: req.session.selectedAddress || null,
    });
  }
};

const updateEvents = async (req, res) => {
  try {
    const { name, user_id, address_id, event_time, event_date, description } =
      req.body;
    const updatedEvents = await eventsModel.update(req.params.id, {
      name,
      user_id,
      address_id,
      event_time,
      event_date,
      description,
    });
    if (updatedEvents) {
      res.status(200).json(updatedEvents);
      res.render('pages/gerenciar', { events });
    } else {
      res.status(404).json({ error: 'Evento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEvents = async (req, res) => {
  try {
    const deletedEvents = await eventsModel.delete(req.params.id);
    if (deletedEvents) {
      res.status(200).json(deletedEvents);
    } else {
      res.status(404).json({ error: 'Evento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllEvents,
  getEventsById,
  createEvents,
  updateEvents,
  deleteEvents,
  showCreateEventPage,
};
