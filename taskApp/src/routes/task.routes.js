/*
    su tarea es definir las operaciones a traves
    de las urls
*/

const express = require('express');

const router = express.Router();

const Task = require('../models/task');

// get - obtener desde el servidor para el cliente algo

router.get('/', async (req, res) => {

    const tasks = await Task.find();
    res.json(tasks);
});

router.get('/:id', async (req, res) => {

    const tasks = await Task.findById(req.params.id);
    res.json(tasks);
});


// post - enviar desde el cliente al servidor algo

router.post('/', async (req, res) => {

    //    console.log(req.body); 
    const { title, description } = req.body;

    // new Task({
    //     title: title,
    //     description: description
    // })

    const task = new Task({ title, description });
    await task.save();

    res.json({ status: 'Task Saved' });
});



// put - actualizar un elemento en el cliente desde el servidor

router.put('/:id', async (req, res) => {
    const { title, description } = req.body;
    const newTask = { title, description };
    await Task.findByIdAndUpdate(req.params.id, newTask)
    res.json({ status: 'Task Updated' });
});


// delete - eliminar desde el servidor algo en el cliente

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({ status: 'Task Deleted' })
});

module.exports = router;