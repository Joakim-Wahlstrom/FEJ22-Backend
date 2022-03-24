const express = require('express');
const path = require('path')
const app = express();
const cors = require('cors')

const todosController = require('./controllers/todosController')

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Content-type, Accept, Authorization, Origin, X-Requested-width')
//   if(req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
//   }
//   next()
// })
app.use(cors())


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/todos', todosController)

app.use(express.static(path.join(__dirname, 'public')))

module.exports = app;