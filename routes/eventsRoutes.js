const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

router.post('/events', eventsController.createEvents);
router.get('/events', eventsController.getAllEvents);
router.get('/events/:id', eventsController.getEventsById);
router.put('/events/:id', eventsController.updateEvents);
router.delete('/events/:id', eventsController.deleteEvents);

module.exports = router;