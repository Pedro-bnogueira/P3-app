const express = require('express');
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(express.urlencoded());
app.use(cookieParser())
app.use(bodyParser.json());

// Habilitar o CORS
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const port = 5000;

app.listen(port, ()=>{
    console.log('Servidor backend do P3 app iniciado na porta '+port);
})

app.use(routes);