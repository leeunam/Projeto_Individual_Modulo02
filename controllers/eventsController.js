const eventsModel = require('../models/eventsModel');

const getAllEvents = async (req, res) => {
  try {
    const events = await eventsModel.getAll();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

const createEvents = async (req, res) => {
  try {
    const { name, user_id, address_id, event_time, event_date, description } = req.body;
    const newEvents = await eventsModel.create({name, user_id, address_id, event_time, event_date, description});
    res.status(201).json(newEvents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEvents = async (req, res) => {
  try {
    const { name, user_id, address_id, event_time, event_date, description } = req.body;
    const updatedEvents = await eventsModel.update(req.params.id, {name, user_id, address_id, event_time, event_date, description});
    if (updatedEvents) {
      res.status(200).json(updatedEvents);
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
  deleteEvents
};