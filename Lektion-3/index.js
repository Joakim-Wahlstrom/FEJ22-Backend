const { userConnect, userDisconnect } = require('./users')
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
  
  socket.on('user', userName => {
    userConnect(socket.id, userName)
    socket.broadcast.emit('user', `${userName} has joined the chat`)
  })

  socket.on('message', data => {
    io.sockets.emit('message', data)
  })

  socket.on('typing', data => {
    socket.broadcast.emit('typing', `${data} is typing a message...`)
  })

  socket.on('disconnect', () => {
    const user = userDisconnect(socket.id)
    io.emit('user', `${user.userName} has left the chat`)
  })

})