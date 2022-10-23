const mongoose = require('mongoose')
const DataSchema = mongoose.Schema({
    title: { type: String },
    description: { type: String },
    status: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId },
    createdAt: { type: Date, default: Date.now() },
})

const TaskModel = mongoose.model('tasks', DataSchema)
module.exports = TaskModel