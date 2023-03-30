import express from 'express';
import ClienteRouter from './router/cliente.route.js';
import AutorRouter from './router/autor.route.js';
import LivroRouter from './router/livro.route.js';
import LivroInfoRouter from './router/livroInfo.route.js';
import VendaRouter from './router/venda.route.js';

const app = express();
app.use(express.json());

app.use('/clientes', ClienteRouter);
app.use('/autores', AutorRouter);
app.use('/livros', LivroRouter);
app.use('/livrosInfo', LivroInfoRouter);
app.use('/vendas', VendaRouter);

app.listen(3030, () => {
  console.log('API Started!');
});
