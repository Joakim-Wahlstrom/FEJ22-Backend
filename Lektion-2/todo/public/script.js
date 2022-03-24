const noTodosText = document.querySelector('#noTodosText')
const output = document.querySelector('#output')

let todos = []

const fetchTodos = async () => {
  const res = await fetch('http://localhost:8080/api/todos')
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
}