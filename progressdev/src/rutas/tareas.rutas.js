const express = require('express');
const router = express.Router();
const Task = require('../modelobase/tabla');

console.log('estoy dentro de las rutas');
/*
CALLBACK//
router.get('/',(req,res)=>{
Task.find((err,tasks){
console.log(tasks);});
res.json({status:'API Works'});
});

PROMISE//
Task.find()
.then(data=>console.log(data))
.catch(err=>console.log(err));

ASYNC-AWAIT//
router.get('/',async (req,res)=>{
const taskss = await.Task.find();//esta tarea va a 

demorar
//console.log(taskss);
res.json(taskss);
});

route.get('/',(req,res)=>{
    res.json({
        status:'usable'
    });
});
*/

// GET all Tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
  });
  
  // GET Tasks for id
  router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
  });
  
  
  // ADD a new task
  router.post('/', async (req, res) => {
    const { user, pass } = req.body;
    const task = new Task({user, pass});
    await task.save();
    res.json({status: 'Task Saved'});
  });
  
  // UPDATE a new task
  router.put('/:id', async (req, res) => {
    const { user, pass } = req.body;
    const newTask = {user, pass};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({status: 'Task Updated'});
  });
  
  //delete a task
  router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({status: 'Task Deleted'});
  });

module.exports = router;