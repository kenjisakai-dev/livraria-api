import express from 'express';
import cors from 'cors';
import sequelize from './src/repositories/db.js';
import clienteRouter from './src/router/cliente.route.js';
import vendaRouter from './src/router/venda.route.js';
import autorRouter from './src/router/autor.route.js';
import livroRouter from './src/router/livro.route.js';
import livroInfoRouter from './src/router/livroInfo.route.js';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/database/create', async (req, res) => {
    await sequelize.sync();
    res.send('Database create');
});

// app.post('/database/drop', async (req, res) => {
//     await sequelize.drop();
//     res.send('Database Drop');
// });

app.use('/api/v1/cliente', clienteRouter);
app.use('/api/v1/venda', vendaRouter);
app.use('/api/v1/autor', autorRouter);
app.use('/api/v1/livro', livroRouter);
app.use('/api/v1/livroInfo', livroInfoRouter);

app.use((err, req, res, next) => {
    return res.status(400).send({ erro: err.message });
});

app.listen(3000, () => {
    console.log('API Started!');
});

export default app;
