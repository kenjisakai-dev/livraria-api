import test from 'node:test';
import assert from 'node:assert';
import supertest from 'supertest';
import app from '../server.js';
import sequelize from '../src/repositories/db.js';
import {
    criarLivroSucesso,
    criarLivroComAutorInexistente,
    atualizarLivroSucesso,
    atualizarLivroComAutorInexistente,
} from './mock/livro.mock.js';
import { criarAutorSucesso } from './mock/autor.mock.js';

const request = supertest(app);
await sequelize.drop();
await sequelize.sync();

await request.post('/api/v1/autor/cadastrar').send(criarAutorSucesso);

test('Criação do livro - Sucesso', async () => {
    const response = await request
        .post('/api/v1/livro/cadastrar')
        .send(criarLivroSucesso);

    assert.strictEqual(response.status, 201);
});

test('Criação do livro - Autor inexistente', async () => {
    const response = await request
        .post('/api/v1/livro/cadastrar')
        .send(criarLivroComAutorInexistente);

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response._body.erro, 'O autor não foi encontrado.');
});

test('Criação do livro - Dados faltantes', async () => {
    const response = await request.post('/api/v1/livro/cadastrar');

    assert.strictEqual(response.status, 400);
    assert.strictEqual(
        response._body.erro,
        'O Nome, Valor, Estoque e código do Autor são obrigatórios.',
    );
});

test('Obtenção do livro - Sucesso', async () => {
    const response = await request.get('/api/v1/livro/info/1');

    assert.strictEqual(response.status, 200);
});

test('Obtenção do livro - Livro inexistente', async () => {
    const response = await request.get('/api/v1/livro/info/100');

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response._body.erro, 'O livro não foi encontrado.');
});

test('Atualização do livro - Sucesso', async () => {
    const response = await request
        .patch('/api/v1/livro/atualizar')
        .send(atualizarLivroSucesso);

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response._body.valor, atualizarLivroSucesso.valor);
});

test('Atualização do livro - Autor inexistente', async () => {
    const response = await request
        .patch('/api/v1/livro/atualizar')
        .send(atualizarLivroComAutorInexistente);

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response._body.erro, 'O autor não foi encontrado.');
});

test('Atualização do livro - Dados faltantes', async () => {
    const response = await request.patch('/api/v1/livro/atualizar');

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response._body.erro, 'O código do livro é obrigatório.');
});

test('Atualização do livro - Livro inexistente', async () => {
    const response = await request
        .patch('/api/v1/livro/atualizar')
        .send({ cod_livro: 100 });

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response._body.erro, 'O livro não foi encontrado.');
});
