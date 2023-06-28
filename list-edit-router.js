/* const express = require('express');
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
 */

const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];

    if (!allowedMethods.includes(req.method)) {
        res.status(405).json({ error: 'Método no permitido.' });
    } else {
        next();
    }
});

function validateTask(req, res, next) {
    if (req.method === 'POST' && Object.keys(req.body).length === 0) {
        res.status(400).json({ error: 'El cuerpo de la solicitud no puede estar vacío.' });
    } else if (req.method === 'POST' && (!req.body.description || req.body.description.trim() === '')) {
        res.status(400).json({ error: 'La descripción de la tarea no puede estar vacía.' });
    } else if (req.method === 'PUT' && Object.keys(req.body).length === 0) {
        res.status(400).json({ error: 'El cuerpo de la solicitud no puede estar vacío.' });
    } else if (req.method === 'PUT' && (!req.body.description || req.body.description.trim() === '')) {
        res.status(400).json({ error: 'La descripción de la tarea no puede estar vacía.' });
    } else {
        next();
    }
}

router.post('/task', validateTask, (req, res) => {
    const { description } = req.body;
    const task = {
        id: taskList.length + 1,
        description: description,
        completed: false
    };
    taskList.push(task);
    res.status(201).json(task);
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

router.put('/task/:id', validateTask, (req, res) => {
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
