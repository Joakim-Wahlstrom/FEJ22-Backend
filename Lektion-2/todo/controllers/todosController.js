const router = require('express').Router()
const todoModel = require('../models/todoModel')

router.get('/', todoModel.getAllTodos)

router.post('/', todoModel.createNewTodo)

router.put('/:id', todoModel.updateTodo)

router.delete('/:id', todoModel.deleteTodo)

module.exports = router