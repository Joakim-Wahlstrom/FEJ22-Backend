const express = require('express');

const app = express();

const todosController = require('./controllers/todosController')

app.use('/api/todos', todosController)


module.exports = app;