const Task = require("../database/model/task.model")
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

const createTask = async (req, res) => {
    const { task, id } = req.body;
    try {
        if (!task) {
            return res.status(400).send("Task field is required")
        }
        if (task.length < 10) {
            return res.status(400).send("add manimum 10 chars")
        }

        const taskRes = await new Task({
            task,
            createdBy: id
        })

        await taskRes.save();
        return res.status(200).send(taskRes)
    } catch (err) {
        console.log(err)
        return res.status(400).send(err.message)
    }

}

const getAllTask = async (req, res) => {
    try {
        const authHeader = req.headers['autherization']

        const token = authHeader.split(' ')[1]

        if (!token) {
            return res.status(401).send("Authorization failed. No access token.");
        }
        jwt.verify(token, 'sdfdfsdfds', async (err, user) => {
            if (err) {
                return res.status(403).send("Could not verify token try again.");
            }

            let tasks = await Task.find({ createdBy: user._id })

            return res.status(200).send(tasks)

        })

    } catch (err) {
        console.log(err)
        return res.status(400).send(err);
    }
}

const editTask = (req, res) => {

}

const statusChange = async (req, res) => {
    const { id, string } = req.body
    try {
        const task = await Task.findById({ _id: id })
        if (string === 'right') {
            if (task.status === 'backlog')
                task.status = "todo"
            else if (task.status === 'todo')
                task.status = "doing"
            else if (task.status === 'doing')
                task.status = "done"

            task.save()
            return res.send(task)
        }
        else {
            if (task.status === 'done')
                task.status = "doing"
            else if (task.status === 'doing')
                task.status = "todo"
            else if (task.status === 'todo')
                task.status = "backlog"

            task.save()
            return res.send(task)

        }


    } catch (err) {
        console.log(err)
    }

}

const deleteTask = async (req, res) => {
    const { id } = req.params


    try {
        const result = await Task.findByIdAndDelete({ _id: id })
        if (result) {
            return res.send("Task deleted")
        }
        console.log("delete - res", res)
    } catch (err) {
        console.log(err)
    }

}

module.exports = { createTask, getAllTask, editTask, statusChange, deleteTask }