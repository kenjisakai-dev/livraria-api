import express from 'express';
import ClienteRouter from './router/cliente.route.js';

const app = express();
app.use(express.json());

app.use('/clientes', ClienteRouter);

app.listen(3030, () => {
  console.log('API Started!');
});
