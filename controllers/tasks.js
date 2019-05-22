const { Task } = require('./../models/task');
const _ = require('lodash');

module.exports = {
    get: async (request, response) => {
        let tasks = await Task.find({ user: request.userId });
        response.send(tasks);
    },

    getOne: async (request, response) => {
        const task = await Task.findById(request.params.id);
        if (!task) {
            return response.status(404).send({ error: 'Task was not found' });
        }
        if (task.user.toString() !== request.userId) {
            return response.status(403).send({ error: "You can't see that task" });
        }
        response.send(task);
    },

    post: async (request, response) => {
        const task = await Task.create({ ...request.body, user: request.userId });
        response.send(task);
    },

    put: async (request, response) => {
        let copy = Object.assign({}, request.body)
        copy = _.omit(copy, ['user']);

        const task = await Task.findOneAndUpdate({ _id: request.params.id, user: request.userId },
                copy, { new: true });
        
        if (!task) {
            return response.status(404).send({ error: 'Task was not found' });
        }
        response.send(task);
    },

    delete: async (request, response) => {
        const task = await Task.findById(request.params.id);
    
        if (!task) {
            return response.status(404).send({ error: 'Task was not found' });
        }

        if (task.user.toString() !== request.userId) {
            return response.status(403).send({ error: "You can't see that task" });
        }
        await task.remove();
        response.send({ message: 'Task was removed' });
    }
}
