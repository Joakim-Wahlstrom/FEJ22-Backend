const Todo = require('../schemas/todoSchema')


exports.getAllTodos = (req, res) => {

  Todo.find({}, (err, data) => {
    if(err) {
      return res.status(500).json({
        statusCode: 500,
        status: false,
        message: 'Something went wrong when fetching the todos',
        err
      })
    }

    res.status(200).json(data)

  })
}

exports.createNewTodo = (req, res) => {
  
  Todo.create({ title:  req.body.title }, (err, data) => {
    if(err) {
      return res.status(500).json({
        statusCode: 500,
        status: false,
        message: 'Something went wrong when creating the todo',
        err
      })
    }

    res.status(201).json(data)

  })
}


exports.updateTodo = (req, res) => {
  Todo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, data) => {

    if(err) {
      return res.status(500).json({
        statusCode: 500,
        status: false,
        message: 'Something went wrong when updating the todo',
        err
      })
    }

    if(!data) {
      return res.status(404).json({
        statusCode: 404,
        status: false,
        message: 'Not found',
        err
      })
    }

    res.status(200).json(data)

  })
}


exports.deleteTodo = (req, res) => {

  Todo.findOneAndDelete({ _id: req.params.id }, (err, data) => {
    if(err) {
      return res.status(500).json({
        statusCode: 500,
        status: false,
        message: 'Something went wrong when deleting the todo',
        err
      })
    }


    if(!data) {
      return res.status(404).json({
        statusCode: 404,
        status: false,
        message: 'Not found',
        err
      })
    }

    res.status(200).json({ id: data._id })

  })
}