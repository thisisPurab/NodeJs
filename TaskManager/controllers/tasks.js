const task = require("../models/task");
const Task = require("../models/task");
const asyncwrapper = require("../middlware/async");
const { createCustomError } = require("../errors/customError");

const getAllTasks = asyncwrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
});

const createTask = asyncwrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
});

const getTask = asyncwrapper(async (req, res, next) => {
    const task = await Task.findOne({ _id: req.params.id });

    if (!task) {
        return next(createCustomError(`no task with id ${req.params.id}`, 404));
    }
    res.status(200).json({ task });
});

const updateTask = asyncwrapper(async (req, res, next) => {
    const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    });

    if (!task) {
        return next(createCustomError(`no task with id ${req.params.id}`, 404));
    }
    res.status(200).json({ task });
});

const deleteTask = asyncwrapper(async (req, res, next) => {
    const task = await Task.findOneAndDelete({ _id: req.params.id });

    if (!task) {
        return next(createCustomError(`no task with id ${req.params.id}`, 404));
    }
    res.status(200).json({ singleTask: null, status: "success" });
});

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
};
