const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let tasks = [];
let idCounter = 1;

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res)=> {
    const{ title, description, priority, deadline, status } = req.body;
    const newTask = { id: idCounter++, title, description, priority, deadline, status };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);

    if(!task){
        return res.status(404).json({error: "Task not found"});

    }
    res.json(task);
});

app.put('/tasks/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);

    if(!task){
        return res.status(404).json({error: "Task not found"});
    }

    const { title, description, priority, deadline, status } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (priority !== undefined) task.priority = priority;
    if (deadline !== undefined) task.deadline = deadline;
    if (status !== undefined) task.status = status;

    res.json({message: "Task updated successfully", task});
});

app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if(index === -1){
        return res.status(404).json({error: "Task not found"});
    }

    tasks.splice(index, 1);
    res.json({message: "Task deleted successfully"});


});



app.listen(port, () => {
    console.log(`Server running at  http://localhost:${port}`);
});