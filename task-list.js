const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let taskList = [];

function addTask() {
    rl.question('Introduce la descripción de la tarea: ', (description) => {
        const task = {
            id: taskList.length + 1,
            description: description,
            completed: false
        };
        taskList.push(task);
        console.log(`La tarea "${task.description}" ha sido añadida a la lista.`);
        showMenu();
    });
}

function removeTask() {
    rl.question('Introduce el número de la tarea que deseas eliminar: ', (taskId) => {
        const taskIndex = taskList.findIndex(task => task.id === parseInt(taskId));
        if (taskIndex !== -1) {
            const task = taskList[taskIndex];
            taskList.splice(taskIndex, 1);
            console.log(`La tarea "${task.description}" ha sido eliminada de la lista.`);
        } else {
            console.log('No se encontró la tarea con el número indicado.');
        }
        showMenu();
    });
}

function completeTask() {
    rl.question('Introduce el número de la tarea que deseas marcar como completada: ', (taskId) => {
        const taskIndex = taskList.findIndex(task => task.id === parseInt(taskId));
        if (taskIndex !== -1) {
            const task = taskList[taskIndex];
            task.completed = true;
            console.log(`La tarea "${task.description}" ha sido marcada como completada.`);
        } else {
            console.log('No se encontró la tarea con el número indicado.');
        }
        showMenu();
    });
}

function showTasks() {
    console.log('Lista de tareas:');
    taskList.forEach(task => {
        console.log(`[${task.id}] ${task.description} - ${task.completed ? 'Completada' : 'Pendiente'}`);
    });
    showMenu();
}

function showMenu() {
    console.log('\n¿Qué acción deseas realizar?');
    console.log('[1] Añadir una tarea');
    console.log('[2] Eliminar una tarea');
    console.log('[3] Marcar una tarea como completada');
    console.log('[4] Mostrar la lista de tareas');
    console.log('[5] Salir');
    rl.question('Opción seleccionada: ', (option) => {
        switch (option) {
            case '1':
                addTask();
                break;
            case '2':
                removeTask();
                break;
            case '3':
                completeTask();
                break;
            case '4':
                showTasks();
                break;
            case '5':
                rl.close();
                break;
            default:
                console.log('Opción no válida.');
                showMenu();
                break;
        }
    });
}

showMenu();