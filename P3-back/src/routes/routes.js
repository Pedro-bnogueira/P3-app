// * componentes
const Auth = require('../controllers/authentication/Auth');
const Login = require('../controllers/authentication/Login');
const Logout = require('../controllers/authentication/Logout')
const NewUser = require('../controllers/authentication/NewUser');
const CreateNotePage = require('../controllers/assets/CreateNotePage');
const GetNotePages = require('../controllers/assets/GetNotePages');
const DeletePage = require('../controllers/assets/DeletePage')
const CreateNote = require('../controllers/assets/CreateNote');
const GetNotes = require('../controllers/assets/GetNotes');
const DeleteNote = require('../controllers/assets/DeleteNote');
const GetFinancas = require('../controllers/assets/GetFinancas');
const CreateTransaction = require('../controllers/assets/CreateTransaction');
const GetAnnualBalance = require('../controllers/assets/GetAnnualBalance')

// * utilitarios
const express = require('express');
const cookieParser = require('cookie-parser');
const routes = express.Router();

// * rotas
// routes.post('/api/auth', Auth.authenticate);
routes.post('/api/login', Login);
routes.post('/api/signup', NewUser);
routes.post('/api/logout', Logout);
routes.post('/api/create-page', CreateNotePage);
routes.post('/api/get-pages', GetNotePages);
routes.post('/api/delete-page', DeletePage);
routes.post('/api/create-note', CreateNote);
routes.post('/api/get-notes', GetNotes);
routes.post('/api/delete-note', DeleteNote);
routes.post('/api/get-financas', GetFinancas);
routes.post('/api/create-transaction', CreateTransaction);
routes.post('/api/get-annual-balance', GetAnnualBalance);



module.exports = routes;