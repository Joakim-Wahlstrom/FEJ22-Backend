const express = require('express');

const app = express();

const todosController = require('./controllers/todosController')

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/todos', todosController)

module.exports = app;