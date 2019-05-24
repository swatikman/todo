import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    title: {
        type: mongoose.Schema.Types.String,
        required: true,
        default: null
    },
    done: {
        type: mongoose.Schema.Types.Boolean,
        default: false,
    }, 
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    }
});

const Task = mongoose.model('Task', taskSchema);

export default Task;