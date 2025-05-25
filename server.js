const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Addressroutes = require('./routes/addressRoutes');
const Eventsroutes = require('./routes/eventsRoutes');
const Usersroutes = require('./routes/usersRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', Addressroutes);
app.use('/api', Eventsroutes);
app.use('/api', Usersroutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});