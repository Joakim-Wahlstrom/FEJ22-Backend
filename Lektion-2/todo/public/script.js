const noTodosText = document.querySelector('#noTodosText')
const output = document.querySelector('#output')
const todoForm = document.querySelector('#todoForm')
const todoInput = document.querySelector('#todoInput')
const myModal = document.querySelector('#addTodo')
const addTodoModal = new bootstrap.Modal(myModal)

let todos = []

const fetchTodos = async () => {
  const res = await fetch('/api/todos')
  const data = await res.json();

  todos = data
  
  if(todos.length <= 0) {
    noTodosText.classList.remove('d-none')
  }
  else {
    noTodosText.classList.add('d-none')
  }

  listTodos(todos)

}

fetchTodos()

const listTodos = (_todos) => {
  output.innerHTML = ''
  _todos.forEach(todo => {
    createTodoElement(todo, output, 'beforeend', false)
  })
}

const createTodoElement = (todo, parent, placement, isNew) => {
  parent.insertAdjacentHTML(placement, `
  <div class="border-bottom ${isNew ? 'slide-in' : ''}" id="todo_${todo._id}">
    <div class="container d-flex justify-content-between align-items-center px-5 py-2">
      <p id="title_${todo._id}" class="title h5 m-0 ${todo.completed ? 'complete' : ''} ">${todo.title}</p>
      <i class="fa-solid fa-trash text-danger" id="delete_${todo._id}"></i>
    </div>
  </div>
  `)

  addRemoveOnClick(todo)
  addToggleComplete(todo)
}

const addRemoveOnClick = todo => {
  document.querySelector(`#delete_${todo._id}`).addEventListener('click', () => {
    deleteTodo(todo)
  })
}
const addToggleComplete = todo => {
  document.querySelector(`#title_${todo._id}`).addEventListener('click', () => {
      toggleTodo(todo)
  })
}

const toggleTodo = async todo => {
  const res = await fetch(`/api/todos/${todo._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      completed: !todo.completed
    })
  })

  if(!res.ok) return

  const data = await res.json()

  const _todo = document.querySelector(`#todo_${data._id}`)
  createTodoElement(data, _todo, 'beforebegin', false)
  _todo.remove()
}

const deleteTodo = async todo => {
  const res = await fetch(`/api/todos/${todo._id}`, { method: 'DELETE' })
  if(!res.ok) return

  const data = await res.json()

  const todoElement = document.querySelector(`#todo_${data.id}`)
  todoElement.addEventListener('animationend', () => {
    todoElement.remove()
    todos = todos.filter(todo => todo._id !== data.id)
    if(todos.length <= 0) {
      noTodosText.classList.remove('d-none')
    }
  })

  todoElement.classList.add('slide-out')

}

const addNewTodo = async title => {
  const res = await fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({ title })
  })

  const data = await res.json()
  createTodoElement(data, output, 'beforeend', true)
  todos.push(data)
  noTodosText.classList.add('d-none')
}

todoForm.addEventListener('submit', e => {
  e.preventDefault();

  if(todoInput.value.trim() === '')
    return
    
  addNewTodo(todoInput.value)
  todoInput.value = ''
  addTodoModal.hide()
})

myModal.addEventListener('shown.bs.modal', function () {
  todoInput.focus()
})