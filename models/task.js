const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    label: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false,
    }
})

const Task = mongoose.model('Task', taskSchema);

module.exports.Task = Task;