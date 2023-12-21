const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
})
const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})
const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findById({ _id: taskID })
    if (!task) {
        return next(createCustomError(`No task with id: ${taskID}`, 404))
    }
    res.status(200).json({ task })
})
const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findByIdAndDelete({ _id: taskID })
    if (!task) return next(createCustomError(`No task with id: ${taskID}`, 404))
    res.status(200).json({ msg: `Task with id: ${taskID} deleted` })
})

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params
    const taskData = req.body
    const task = await Task.findByIdAndUpdate({ _id: taskID }, taskData, { new: true, runValidators: true })
    if (!task) return res.status(404).json({ msg: `Task with id: ${taskID} not found` })
    res.status(200).json({ taskID, task })
})

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}