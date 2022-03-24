const app = require('./app');
require('dotenv').config();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 9999
const serverURI = 'http://localhost:' + PORT
const mongoURI = process.env.MONGO_URI

app.listen(PORT, () => console.log('server is running at: ' + serverURI))
mongoose.connect(mongoURI, () => console.log('Connected to DB'))