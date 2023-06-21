const router = require('express').Router()
const { getAllTasks, createTask, getTaskById, updateTaskById, deleteTaskById,getTasksByPriority } = require('../controllers/tasks')

router.route('/')
    .get(getAllTasks)
    .post(createTask)

router.route('/:id')
    .get(getTaskById)
    .put(updateTaskById)
    .delete(deleteTaskById)

router.route('/priority/:level').get(getTasksByPriority)

module.exports = router