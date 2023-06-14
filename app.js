const express = require('express');
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

const app = express();
app.use(express.json());

// Otras configuraciones y middlewares...

app.use('/tasks', listViewRouter);
app.use('/tasks', listEditRouter);

// Manejo de otras rutas y middlewares...

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
