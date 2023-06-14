const express = require('express');
const router = express.Router();

router.get('/completed', (req, res) => {
    const completedTasks = taskList.filter(task => task.completed);
    res.json(completedTasks);
});

router.get('/incomplete', (req, res) => {
    const incompleteTasks = taskList.filter(task => !task.completed);
    res.json(incompleteTasks);
});

module.exports = router;
