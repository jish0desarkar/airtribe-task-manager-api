const path = require('path')
const fs = require('fs')
const { json } = require('express')
const taskSchema = require('../validators/task-validator')
const { sortAndFilterData, setTaskID } = require("../helpers/task-helpers")

const taskFilePath = path.join(__dirname, '..', 'tasks.json')


// Get all tasks
const getAllTasks = async (req, res) => {
    const taskData = getTaskData(taskFilePath)
    if (!taskData.tasks ||  taskData.tasks.length === 0) {
        res.status(404).send( {"error": "No tasks found"} )
    } else {
        filteredTaskList = sortAndFilterData(req.query.sort, req.query.isCompleted, taskData.tasks)
        res.status(200).send({ tasks: filteredTaskList })
    }
}

// Get task by ID
const getTaskById = async (req, res) => {
    const taskData = getTaskData(taskFilePath)
    let task = taskData.tasks.filter((task) => task.ID === Number(req.params.id))[0]
    if (!task) {
        res.status(404).send( {"error": "No task found"} )
    } else {
        res.status(200).send(task)
    }
}


// Create a new task
const createTask = async (req, res) => {
    const taskData = getTaskData(taskFilePath)
    const newTask = req.body
    newTask['created-at'] = new Date()
    newTask['ID'] = setTaskID(taskData.tasks)
    try {
        taskSchema.validateSync(newTask, { abortEarly: false })
        if (taskData.tasks.some(task => task.ID === newTask.ID)) throw new Error ("Task already exists")
        taskData.tasks.push(newTask)
        fs.writeFileSync(taskFilePath, JSON.stringify(taskData))
        res.status(201).json(taskData.tasks.filter((task) => task.ID === newTask.ID)[0])
    } catch(err) {
        if (err.name === 'ValidationError') {
            res.status(422).json( { error: err.errors } )
        } else {
            res.status(500).json( { error: err.message} )
        }
    }
}

// Update task by ID
const updateTaskById = async (req, res) => {
    const taskData = getTaskData(taskFilePath)
    const taskIdToBeUpdated = Number(req.params.id)
    const task = taskData.tasks.filter((task) => task.ID === taskIdToBeUpdated)[0]
    if (!task) {
        res.status(404).send( {"error": "No task found"} )
    } else {
        try {
            const updatedTaskInput = req.body
            taskSchema.validateSync(updatedTaskInput, { abortEarly: false })
            const updatedTaskData = { tasks: taskData.tasks
                .map((task) => task.ID === taskIdToBeUpdated ? {...updatedTaskInput, "ID": taskIdToBeUpdated, "created-at": task['created-at']} : task)}
            a = fs.writeFileSync(taskFilePath, JSON.stringify(updatedTaskData))
            res.status(200).json(updatedTaskData.tasks.filter((task) => task.ID === taskIdToBeUpdated)[0])
        } catch(err) {
            if (err.name === 'ValidationError') {
                res.status(422).json( { error: err.errors } )
            } else {
                res.status(500).json( { error: err.message} )
            }
        }
    }
}

// Delete task by ID
const deleteTaskById = async (req, res) => {
    const taskData = getTaskData(taskFilePath)
    const taskIdToBeDeleted = Number(req.params.id)
    const task = taskData.tasks.filter((task) => task.ID === taskIdToBeDeleted)[0]
    if (!task) {
        res.status(404).send( {"error": "No task found"} )
    } else {
        const updatedTaskData = {tasks: taskData.tasks.filter((task) => task.ID !== taskIdToBeDeleted)}
        fs.writeFileSync(taskFilePath, JSON.stringify(updatedTaskData))
        res.status(200).json({"message": `Task ${task.title} deleted successfully` })
    }
}

// Get tasks by priority
const getTasksByPriority = async (req, res) => {
    const taskData = getTaskData(taskFilePath)
    const priority = req.params.level.toLowerCase()
    const tasks = taskData.tasks.filter((task) => task.priority === priority)
    if (tasks.length === 0) {
        res.status(404).send( {"error": "No tasks found"} )
    } else {
        filteredTaskList = sortAndFilterData(req.query.sort, req.query.isCompleted, tasks)
        res.status(200).send({ tasks: filteredTaskList })
    }
}

const getTaskData = (path) => {
    return JSON.parse(fs.readFileSync(path))
}

module.exports = { getAllTasks, createTask, getTaskById, updateTaskById, deleteTaskById, getTasksByPriority }