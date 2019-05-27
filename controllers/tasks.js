import Task from '../models/Task';

export const get = async (request, response) => {
    const conditions = {
        user: request.user._id
    };
    if (request.query.filter === 'done') {
        conditions.done = true;
    } else if (request.query.filter === 'in-progress') {
        conditions.done = false;
    }
    if (request.query.search) {
        conditions.title = new RegExp(request.query.search, 'i');
    }
    const tasks = await Task.find(conditions);
    response.send(tasks);
};

export const getOne = async (request, response) => {
    const task = await Task.findById(request.params.id);
    if (!task) {
        return response.status(404).send({ error: 'Task was not found' });
    }
    if (!task.user.equals(request.user._id)) {
        return response.status(403).send({ error: "You can't see that task" });
    }
    response.send(task);
};

export const create = async (request, response) => {
    const task = await Task.create({ ...request.body, user: request.user._id });
    response.send(task);
};

export const update = async (request, response) => {
    const task = await Task.findOneAndUpdate({ _id: request.params.id, user: request.user._id },
            { ...request.body, user: request.user._id}, { new: true });
        
    if (!task) {
        return response.status(404).send({ error: 'Task was not found' });
    }
    response.send(task);
};

export const deleteTask = async (request, response) => {
    const task = await Task.findOneAndDelete({ _id: request.params.id, user: request.user._id });
    if (!task) {
        return response.status(404).send({ error: 'Task was not found' });
    }
    response.send({ message: 'Task was removed' });
};
