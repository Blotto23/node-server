const express = require('express');
const router = express.Router();

router.post('/task', (req, res) => {
    const { description } = req.body;
    if (description.trim() === '') {
        res.status(400).json({ error: 'La descripción de la tarea no puede estar vacía.' });
    } else {
        const task = {
            id: taskList.length + 1,
            description: description,
            completed: false
        };
        taskList.push(task);
        res.status(201).json(task);
    }
});

router.delete('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = taskList.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        taskList.splice(taskIndex, 1);
        res.sendStatus(204);
    } else {
        res.status(404).json({ error: 'No se encontró la tarea con el número indicado.' });
    }
});

router.put('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = taskList.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        const task = taskList[taskIndex];
        task.completed = true;
        res.status(200).json(task);
    } else {
        res.status(404).json({ error: 'No se encontró la tarea con el número indicado.' });
    }
});

module.exports = router;
