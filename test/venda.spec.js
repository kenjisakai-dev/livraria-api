import test from 'node:test';
import assert from 'node:assert';
import supertest from 'supertest';
import app from '../server.js';
import sequelize from '../src/repositories/db.js';
import {
    criarVendaSucesso,
    criarVendaComClienteInexistente,
    criarVendaComLivroInexistente,
} from './mock/venda.mock.js';
import { criarClienteSucesso } from './mock/cliente.mock.js';
import { criarAutorSucesso } from './mock/autor.mock.js';
import { criarLivroSucesso } from './mock/livro.mock.js';

const request = supertest(app);
await sequelize.drop();
await sequelize.sync();

await request.post('/api/v1/cliente/cadastrar').send(criarClienteSucesso);
await request.post('/api/v1/autor/cadastrar').send(criarAutorSucesso);
await request.post('/api/v1/livro/cadastrar').send(criarLivroSucesso);

test('Criação do venda - Sucesso', async () => {
    const response = await request
        .post('/api/v1/venda/cadastrar')
        .send(criarVendaSucesso);

    assert.strictEqual(response.status, 201);
    assert.strictEqual(response._body.valor, criarLivroSucesso.valor);
});

test('Criação do venda - Livro não possuí em estoque', async () => {
    const response = await request
        .post('/api/v1/venda/cadastrar')
        .send(criarVendaSucesso);

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response._body.erro, 'O livro não possui em estoque.');
});

test('Criação do venda - Verificação da diminuição do estoque após a venda', async () => {
    const response = await request.get('/api/v1/livro/info/1');

    assert.strictEqual(response._body.estoque, --criarLivroSucesso.estoque);
});

test('Criação do venda - Cliente inexistente', async () => {
    const response = await request
        .post('/api/v1/venda/cadastrar')
        .send(criarVendaComClienteInexistente);

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response._body.erro, 'O cliente não foi encontrado.');
});

test('Criação do venda - Livro inexistente', async () => {
    const response = await request
        .post('/api/v1/venda/cadastrar')
        .send(criarVendaComLivroInexistente);

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response._body.erro, 'O livro não foi encontrado.');
});

test('Criação do venda - Dados faltantes', async () => {
    const response = await request.post('/api/v1/venda/cadastrar');

    assert.strictEqual(response.status, 400);
    assert.strictEqual(
        response._body.erro,
        'O código do cliente e código do livro são obrigatórios.',
    );
});

test('Obtenção do venda - Sucesso', async () => {
    const response = await request.get('/api/v1/venda/info/1');

    assert.strictEqual(response.status, 200);
});

test('Obtenção do venda - Venda inexistente', async () => {
    const response = await request.get('/api/v1/venda/info/100');

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response._body.erro, 'A venda não foi encontrada.');
});
