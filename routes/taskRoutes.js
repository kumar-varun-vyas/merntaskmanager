const express = require('express')

const taskRouter = express.Router()
const { createTask, getAllTask, statusChange, deleteTask } = require('../controllers/taskController')

taskRouter.post('/createTask', createTask)
taskRouter.get('/tasks', getAllTask)
taskRouter.delete('/:id', deleteTask)

taskRouter.put('/:id', statusChange)

module.exports = taskRouter