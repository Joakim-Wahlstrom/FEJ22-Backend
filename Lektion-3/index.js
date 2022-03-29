const express = require('express');
const socket = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log('Server running on http://localhost:' + PORT))


const io = socket(server)


io.on('connection', socket => {
  console.log('New user connected', socket.id)

  socket.emit('message', 'Välkommen till chatten')

})