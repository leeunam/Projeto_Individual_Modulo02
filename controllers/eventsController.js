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

    const events = await eventsModel.getByUserId(req.session.user.id);
    req.session.success = 'Evento criado com sucesso!';

    res.render('pages/gerenciar', {
      events,
      user: req.session.user,
      success: req.session.success,
      error: null,
    });
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

const showManageEventsPage = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    // Buscar eventos do usuário logado
    const userEvents = await eventsModel.getByUserId(req.session.user.id);

    res.render('pages/gerenciar', {
      events: userEvents,
      user: req.session.user,
      success: req.session.success || null,
      error: null,
    });

    // Limpar mensagem de sucesso da sessão
    delete req.session.success;
  } catch (error) {
    console.error('Erro ao carregar eventos do usuário:', error);
    res.render('pages/gerenciar', {
      events: [],
      user: req.session.user,
      success: null,
      error: 'Erro ao carregar seus eventos.',
    });
  }
};

// Função para mostrar detalhes do evento para edição
const showEditEventPage = async (req, res) => {
  try {
    // Verificar se o usuário está logado
    if (!req.session.user) {
      return res.redirect('/login');
    }

    const eventId = req.params.id;
    
    // Validar se o ID é um número válido
    if (!eventId || isNaN(parseInt(eventId)) || !Number.isInteger(Number(eventId))) {
      return res.redirect('/gerenciar?error=ID de evento inválido');
    }

    const event = await eventsModel.getByIdWithDetails(eventId);

    if (!event) {
      return res.redirect('/gerenciar?error=Evento não encontrado');
    }

    // Verificar se o evento pertence ao usuário logado
    if (event.user_id !== req.session.user.id) {
      return res.redirect(
        '/gerenciar?error=Você não tem permissão para editar este evento'
      );
    }

    res.render('pages/editarEvento', {
      event: event,
      user: req.session.user,
      error: null,
      success: null,
    });
  } catch (error) {
    console.error('Erro ao carregar evento para edição:', error);
    res.redirect('/gerenciar?error=Erro ao carregar evento');
  }
};

// Função para processar a edição do evento
const processEditEvent = async (req, res) => {
  try {
    // Verificar se o usuário está logado
    if (!req.session.user) {
      return res.redirect('/login');
    }

    const eventId = req.params.id;
    
    // Validar se o ID é um número válido
    if (!eventId || isNaN(parseInt(eventId)) || !Number.isInteger(Number(eventId))) {
      return res.redirect('/gerenciar?error=ID de evento inválido');
    }
    const {
      name,
      event_date,
      event_time,
      description,
      street,
      number,
      district,
      cep,
    } = req.body;

    // Verificar se o evento existe e pertence ao usuário
    const existingEvent = await eventsModel.getByIdWithDetails(eventId);
    if (!existingEvent || existingEvent.user_id !== req.session.user.id) {
      return res.redirect(
        '/gerenciar?error=Evento não encontrado ou sem permissão'
      );
    }

    // Atualizar endereço se fornecido
    let address_id = existingEvent.address_id;
    if (street && number && district && cep) {
      const addressModel = require('../models/addressModel');
      const updatedAddress = await addressModel.update(address_id, {
        street,
        number: parseInt(number),
        district,
        cep,
      });
      if (!updatedAddress) {
        return res.render('pages/detalhesEventos', {
          event: existingEvent,
          user: req.session.user,
          isEditing: true,
          error: 'Erro ao atualizar endereço',
          success: null,
        });
      }
    }

    // Atualizar evento
    const updatedEvent = await eventsModel.update(eventId, {
      name,
      user_id: req.session.user.id,
      address_id,
      event_time,
      event_date,
      description,
    });

    if (updatedEvent) {
      req.session.success = 'Evento atualizado com sucesso!';
      res.redirect('/gerenciar');
    } else {
      return res.render('pages/editarEvento', {
        event: existingEvent,
        user: req.session.user,
        error: 'Erro ao atualizar evento',
        success: null,
      });
    }
  } catch (error) {
    console.error('Erro ao processar edição do evento:', error);
    res.redirect('/gerenciar?error=Erro ao atualizar evento');
  }
};

const deleteEvents = async (req, res) => {
  try {
    // Verificar se o usuário está logado
    if (!req.session.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const eventId = req.params.id;

    // Verificar se o evento existe e pertence ao usuário
    const event = await eventsModel.getByIdWithDetails(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }

    if (event.user_id !== req.session.user.id) {
      return res
        .status(403)
        .json({ error: 'Você não tem permissão para excluir este evento' });
    }

    // Deletar evento
    const deleted = await eventsModel.delete(eventId);
    if (deleted) {
      res.status(200).json({ success: 'Evento excluído com sucesso' });
    } else {
      res.status(500).json({ error: 'Erro ao excluir evento' });
    }
  } catch (error) {
    console.error('Erro ao excluir evento:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Função para mostrar detalhes de um evento (para usuários que não criaram o evento)
const showEventDetails = async (req, res) => {
  try {
    const eventId = req.params.id;
    
    // Validar se o ID é um número válido
    if (!eventId || isNaN(parseInt(eventId)) || !Number.isInteger(Number(eventId))) {
      return res.redirect('/eventos?error=ID de evento inválido');
    }

    const event = await eventsModel.getByIdWithDetails(eventId);

    if (!event) {
      return res.redirect('/eventos?error=Evento não encontrado');
    }

    // Se o usuário estiver logado e for o criador do evento, redirecionar para edição
    if (req.session.user && event.user_id === req.session.user.id) {
      return res.redirect(`/evento/${eventId}/editar`);
    }

    res.render('pages/detalhesEventos', {
      event: event,
      user: req.session.user || null,
      error: null,
      success: null,
    });
  } catch (error) {
    console.error('Erro ao carregar detalhes do evento:', error);
    res.redirect('/eventos?error=Erro ao carregar evento');
  }
};

// Função para processar inscrição em evento
const registerForEvent = async (req, res) => {
  try {
    // Verificar se o usuário está logado
    if (!req.session.user) {
      return res.redirect('/login');
    }

    const eventId = req.params.id;
    const event = await eventsModel.getByIdWithDetails(eventId);

    if (!event) {
      return res.redirect('/eventos?error=Evento não encontrado');
    }

    // Verificar se o usuário não é o criador do evento
    if (event.user_id === req.session.user.id) {
      return res.redirect(
        `/evento/${eventId}/editar?error=Você não pode se inscrever no seu próprio evento`
      );
    }

    // Aqui você pode adicionar lógica para salvar a inscrição na base de dados
    // Por enquanto, vamos apenas redirecionar para a página de confirmação

    res.redirect(`/inscricao-confirmada/${eventId}`);
  } catch (error) {
    console.error('Erro ao processar inscrição:', error);
    res.redirect(`/evento/${req.params.id}?error=Erro ao processar inscrição`);
  }
};

// Função para mostrar página de confirmação de inscrição
const showRegistrationConfirmation = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await eventsModel.getByIdWithDetails(eventId);

    if (!event) {
      return res.redirect('/eventos?error=Evento não encontrado');
    }

    res.render('pages/inscricaoConfirmada', {
      event: event,
      user: req.session.user || null,
      error: null,
      success: null,
    });
  } catch (error) {
    console.error('Erro ao carregar página de confirmação:', error);
    res.redirect('/eventos?error=Erro ao carregar página');
  }
};

module.exports = {
  getAllEvents,
  getEventsById,
  showCreateEventPage,
  createEvents,
  updateEvents,
  showManageEventsPage,
  showEditEventPage,
  processEditEvent,
  deleteEvents,
  showEventDetails,
  registerForEvent,
  showRegistrationConfirmation,
};
