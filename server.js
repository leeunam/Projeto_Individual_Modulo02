const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const Addressroutes = require('./routes/addressRoutes');
const Eventsroutes = require('./routes/eventsRoutes');
const Usersroutes = require('./routes/usersRoutes');
const eventsController = require('./controllers/eventsController');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'views')));

// Middleware de debug
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  if (req.method === 'POST') {
    console.log('Body:', req.body);
  }
  next();
});

app.use('/api', Addressroutes);
app.use('/api', Eventsroutes);
app.use('/api', Usersroutes);
app.use('/', Usersroutes);

// Rotas para páginas
app.get('/eventos', eventsController.getAllEvents);
app.get('/criarEvento', eventsController.showCreateEvent);
app.post('/criarEvento', eventsController.processCreateEvent);

app.get('/', (req, res) => {
  res.render('pages/home');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
