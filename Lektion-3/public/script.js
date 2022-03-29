const socket = io();
const messages = document.querySelector('#messages')
const chatForm = document.querySelector('#chatForm')
const chatMessage = document.querySelector('#chatMessage')
const feedback = document.querySelector('#feedback')
const chatWindow = document.querySelector('#chatWindow')

const userName = new URLSearchParams(window.location.search).get('name');
document.querySelector('#me').innerText = userName;

socket.on('connect', () => {
  socket.emit('user', userName)
})

socket.on('user', data => {
  messages.innerHTML += `<p class="inline-feedback">${data}</p>`
  chatWindow.scrollTop = chatWindow.scrollHeight;
})

socket.on('message', data => {
  let position = data.id === socket.id ? 'right' : ''

  messages.innerHTML += `
    <div class="single-message ${ position }">
      <p class="single-message_name">${data.name}</p>
      <p class="single-message_msg">${data.message}</p>
    </div>
  `

  feedback.innerText = ''
  feedback.classList.add('d-none')
  chatWindow.scrollTop = chatWindow.scrollHeight;
})

socket.on('typing', data => {
  feedback.innerText = data
  feedback.classList.remove('d-none')
  chatWindow.scrollTop = chatWindow.scrollHeight;
})




chatForm.addEventListener('submit', e => {
  e.preventDefault()

  if(chatMessage.value.trim() === '') return

  socket.emit('message', {
    id: socket.id,
    message: chatMessage.value,
    name: userName
  })

  chatMessage.value = '';
  chatMessage.focus();
})

chatMessage.addEventListener('keypress', () => {
  socket.emit('typing', userName)
})