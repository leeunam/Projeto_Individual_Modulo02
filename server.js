const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const Addressroutes = require('./routes/addressRoutes');
const Eventsroutes = require('./routes/eventsRoutes');
const Usersroutes = require('./routes/usersRoutes');
const addressController = require('./controllers/addressController');
const eventsController = require('./controllers/eventsController');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'sua-chave-secreta-aqui',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use('/style.css', express.static(path.join(__dirname, 'views/style.css')));
app.use('/scripts.js', express.static(path.join(__dirname, 'views/scripts.js')));

app.use('/pages', express.static(path.join(__dirname, 'views/pages')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  if (req.method === 'POST') {
    console.log('Body:', req.body);
  }
  if (req.session && req.session.user) {
  } else {
  }
  next();
});

app.use('/api', Addressroutes);
app.use('/api', Eventsroutes);
app.use('/api', Usersroutes);
app.use('/', Usersroutes);

app.get('/eventos', eventsController.getAllEvents);
app.get('/evento/:id', eventsController.showEventDetails);
app.get('/criarEvento', eventsController.showCreateEventPage);
app.post('/criarEvento', eventsController.createEvents);
app.get('/adicionarEndereco', addressController.showAddressForm);
app.get('/gerenciar', eventsController.showManageEventsPage);
app.get('/evento/:id/editar', eventsController.showEditEventPage);
app.post('/evento/:id/editar', eventsController.processEditEvent);
app.post('/evento/:id/inscrever', eventsController.registerForEvent);
app.get('/inscricao-confirmada/:id',eventsController.showRegistrationConfirmation);
app.delete('/evento/:id', eventsController.deleteEvents);

app.get('/', (req, res) => {
  res.render('pages/home');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
