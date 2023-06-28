const express = require('express');
const router = express.Router();


router.use((req, res, next) => {
    const validParams = ['completed', 'incomplete'];

    if (!validParams.includes(req.params.type)) {
        res.status(400).json({ error: 'Parámetro inválido.' });
    } else {
        next();
    }
});

router.get('/completed', (req, res) => {
    const completedTasks = taskList.filter(task => task.completed);
    res.json(completedTasks);
});

router.get('/incomplete', (req, res) => {
    const incompleteTasks = taskList.filter(task => !task.completed);
    res.json(incompleteTasks);
});

module.exports = router;
