const path = require('path')
const fs = require('fs')
const { json } = require('express')
const taskSchema = require('../validators/task-validator')
const { sortAndFilterData, setTaskID, filterTaskById, insertUpdatedTaskToTasklist } = require("../helpers/task-helpers")

const taskFilePath = path.join(__dirname, '..', 'tasks.json')

const getTaskData = (path) => JSON.parse(fs.readFileSync(path))


// Get all tasks
const getAllTasks = async (req, res) => {
    const taskData = getTaskData(taskFilePath)
    if (!taskData.tasks || taskData.tasks.length === 0) {
        res.status(404).send({ error: "No tasks found" })
    } else {
        const filteredTaskList = sortAndFilterData(req.query.sort, req.query.isCompleted, taskData.tasks)
        res.status(200).send({ tasks: filteredTaskList })
    }
}

// Get task by ID
const getTaskById = async (req, res) => {
    const taskData = getTaskData(taskFilePath)
    let task = filterTaskById(taskData.tasks, Number(req.params.id))
    if (!task) {
        res.status(404).send({ error: "No task found" })
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
        res.status(201).send(newTask)
    } catch(err) {
        if (err.name === 'ValidationError') {
            res.status(422).send({ error: err.errors })
        } else {
            res.status(500).send({ error: err.message})
        }
    }
}

// Update task by ID
const updateTaskById = async (req, res) => {
    const taskData = getTaskData(taskFilePath)
    const taskIdToBeUpdated = Number(req.params.id)
    const task = filterTaskById(taskData.tasks, taskIdToBeUpdated)
    if (!task) {
        res.status(404).send({ error: "No task found" })
    } else {
        try {
            const updatedTaskInput = req.body
            taskSchema.validateSync(updatedTaskInput, { abortEarly: false })
            const updatedTaskData = insertUpdatedTaskToTasklist(taskData.tasks, updatedTaskInput, taskIdToBeUpdated)
            a = fs.writeFileSync(taskFilePath, JSON.stringify(updatedTaskData))
            res.status(200).send(filterTaskById(updatedTaskData.tasks, taskIdToBeUpdated)) // Sends the newly updated task
        } catch(err) {
            if (err.name === 'ValidationError') {
                res.status(422).send({ error: err.errors })
            } else {
                res.status(500).send({ error: err.message})
            }
        }
    }
}

// Delete task by ID
const deleteTaskById = async (req, res) => {
    const taskData = getTaskData(taskFilePath)
    const taskIdToBeDeleted = Number(req.params.id)
    const task = filterTaskById(taskData.tasks, taskIdToBeDeleted)
    if (!task) {
        res.status(404).send({ error: "No task found" })
    } else {
        const taskDataAfterDeletion = { tasks: taskData.tasks.filter((task) => task.ID !== taskIdToBeDeleted) }
        fs.writeFileSync(taskFilePath, JSON.stringify(taskDataAfterDeletion))
        res.status(200).send({ message: `Task ${task.title} deleted successfully` })
    }
}

// Get tasks by priority
const getTasksByPriority = async (req, res) => {
    const taskData = getTaskData(taskFilePath)
    const priority = req.params.level.toLowerCase()
    const filteredTasksByPriority = taskData.tasks.filter((task) => task.priority === priority)
    if (filteredTasksByPriority.length === 0) {
        res.status(404).send( {error: "No tasks found"} )
    } else {
        const filteredTaskList = sortAndFilterData(req.query.sort, req.query.isCompleted, filteredTasksByPriority)
        res.status(200).send({ tasks: filteredTaskList })
    }
}

module.exports = { getAllTasks, createTask, getTaskById, updateTaskById, deleteTaskById, getTasksByPriority }