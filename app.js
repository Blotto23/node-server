const express = require('express');
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

const app = express();
app.use(express.json());


app.use((req, res, next) => {
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  if (!allowedMethods.includes(req.method)) {
    res.status(405).json({ error: 'Método no permitido.' });
  } else {
    next();
  }
});

app.use('/tasks', (req, res, next) => {
  const validParams = ['completed', 'incomplete'];

  if (!validParams.includes(req.params.type)) {
    res.status(400).json({ error: 'Parámetro inválido.' });
  } else {
    next();
  }
});

app.use('/tasks', listViewRouter);
app.use('/tasks', listEditRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
