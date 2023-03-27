import express from 'express';
import ClienteRouter from './router/cliente.route.js';
import AutorRouter from './router/autor.route.js';

const app = express();
app.use(express.json());

app.use('/clientes', ClienteRouter);
app.use('/autores', AutorRouter);

app.listen(3030, () => {
  console.log('API Started!');
});
