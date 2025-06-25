const mongoose = require('mongoose');
const Task = require('./models/Task');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error", err));

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({error: "Failed to fetch tasks"});
    }
});

app.post('/tasks', async(req, res)=> {
    try {
        const{ title, description, priority, deadline, status } = req.body;
        const newTask = new Task({title, description, priority, deadline, status });
        await newTask.save();
        res.status(201).json(newTask);

    } catch (error) {
    res.status(400).json({error: "Failed to create tasks."});
    }
});

app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if(!task){
            return res.status(404).json({error: "Task not found"});
        }
        res.json(task);    
    } catch (error) {
        res.status(500).json({error:"Task not found or Invalid ID"});
    }
});

app.put('/tasks/:id', async (req, res) =>{
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true});
        if (!updatedTask){
            return res.status(404).json({error : "Task not found"})
        }
        res.json({message: "Task updated successfully", task: updatedTask});
    } catch (error) {
        res.status(400).json({error: "Failed to update task."})
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if(!deletedTask){
            return res.status(404).json({error: "Task not found"});
        }
        res.json({message: "Task deleted successfully"});
    } catch (error) {
        res.status(500).json({error: "Failed to delete task."})
    }
});



app.listen(port, () => {
    console.log(`Server running at  http://localhost:${port}`);
});