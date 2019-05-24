import Task from '../models/Task';

export const get = async (request, response) => {
    const tasks = await Task.find({ user: request.userId });
    response.send(tasks);
};

export const getOne = async (request, response) => {
    const task = await Task.findById(request.params.id);
    if (!task) {
        return response.status(404).send({ error: 'Task was not found' });
    }
    if (task.user.toString() !== request.userId) {
        return response.status(403).send({ error: "You can't see that task" });
    }
    response.send(task);
};

export const create = async (request, response) => {
    const task = await Task.create({ ...request.body, user: request.userId });
    response.send(task);
};

export const update = async (request, response) => {

    const task = await Task.findOneAndUpdate({ _id: request.params.id, user: request.userId },
            { ...request.body, user: request.userId}, { new: true });
        
    if (!task) {
        return response.status(404).send({ error: 'Task was not found' });
    }
    response.send(task);
};

export const deleteTask = async (request, response) => {
    const task = await Task.findOneAndDelete({ _id: request.params.id, user: request.userId });
    if (!task) {
        return response.status(404).send({ error: 'Task was not found' });
    }
    response.send({ message: 'Task was removed' });
};
