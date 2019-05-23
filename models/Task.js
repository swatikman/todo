import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    done: {
        type: mongoose.Schema.Types.Boolean,
        default: false,
    }
})

const Task = mongoose.model('Task', taskSchema);

export default Task;