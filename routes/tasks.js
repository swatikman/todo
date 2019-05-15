const express = require('express');
const router = express.Router();
const Joi = require('joi');

const auth = require('./../middlewares/auth');
const { Task } = require('./../models/task');

router.get('/', auth, async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
});

router.get('/:id', auth, async (req, res) => {
    if (!req.params.id) return res.status(400).send({ error: 'Invalid id' });

    const task = await Task.findOne(req.params.id);
    if (!task) return res.status(404).send({ error: 'Task was not found' });

    res.send(task);
});

router.post('/', auth, async (req, res) => {
    const { error } = validateTask(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });   
    
    req.body.user = res.locals.user._id;
    const task = new Task(req.body);
    try {
        await task.save();
        res.send(task);
    } catch (e) {
        res.send(400).send({ error: 'Task was not saved' });
    }
});

router.put('/:id', auth, async (req, res) => {
    if (!req.params.id) return res.status(400).send({ error: 'Invalid id' });

    const { error } = validateTask(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });   
    
    // task can't change owner
    delete req.body.user;
    
    try {
        const task = await Task.findOneAndUpdate({ _id: req.params.id, user: res.locals.user.id }, req.body, { new: true });
        if (!task) return res.status(404).send({ error: 'Task was not found' });
        res.send(task);
    } catch (e) {
        return res.status(400).send({ error: 'Task was not saved' });
    }
});

router.delete('/:id', auth, async (req, res) => {
    if (!req.params.id) return res.status(400).send('Invalid id');   
    
    const userId = res.locals.user._id
    
    try { 
        const task = await Task.findOne({ _id: req.params.id, user: userId });
        if (!task) return res.status(404).send({ error: 'Task was not found' });
        
        await task.remove();
        res.send({ message: 'Task was removed' });
    } catch (e) {
        console.log(e);
        res.status(400).send({ error: 'Error occurred. Task was not deleted, try again later' });
    }
});

validateTask = (task) => {
    const schema = {
        label: Joi.string().min(1).required(),
        done: Joi.boolean(),
        user: Joi.string().length(24)
    };
    return Joi.validate(task, schema);
}

module.exports = router;