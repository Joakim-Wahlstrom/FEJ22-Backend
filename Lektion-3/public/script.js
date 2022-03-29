const socket = io();
const messages = document.querySelector('#messages')

const userName = new URLSearchParams(window.location.search).get('name');
document.querySelector('#me').innerText = userName;

socket.on('connect', () => {
  socket.emit('user', userName)
})

socket.on('user', data => {
  messages.innerHTML += `<p class="inline-feedback">${data}</p>`
})