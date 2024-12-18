import test from 'node:test';
import assert from 'node:assert';
import supertest from 'supertest';
import app from '../server.js';
import sequelize from '../src/repositories/db.js';
import { criarAutorSucesso, atualizarAutorSucesso } from './mock/autor.mock.js';

const request = supertest(app);
await sequelize.drop();
await sequelize.sync();

test('Criação do autor - Sucesso', async () => {
    const response = await request
        .post('/api/v1/autor/cadastrar')
        .send(criarAutorSucesso);

    assert.strictEqual(response.status, 201);
});

test('Criação do autor - Dados faltantes', async () => {
    const response = await request.post('/api/v1/autor/cadastrar');

    assert.strictEqual(response.status, 400);
    assert.strictEqual(
        response._body.erro,
        'O Nome, Email e Telefone são obrigatórios.',
    );
});

test('Obtenção do autor - Sucesso', async () => {
    const response = await request.get('/api/v1/autor/info/1');

    assert.strictEqual(response.status, 200);
});

test('Obtenção do autor - Autor inexistente', async () => {
    const response = await request.get('/api/v1/autor/info/100');

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response._body.erro, 'O autor não foi encontrado.');
});

test('Atualização do autor - Sucesso', async () => {
    const response = await request
        .patch('/api/v1/autor/atualizar')
        .send(atualizarAutorSucesso);

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response._body.telefone, atualizarAutorSucesso.telefone);
});

test('Atualização do autor - Dados faltantes', async () => {
    const response = await request.patch('/api/v1/autor/atualizar');

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response._body.erro, 'O código do autor é obrigatório.');
});

test('Atualização do autor - Autor inexistente', async () => {
    const response = await request
        .patch('/api/v1/autor/atualizar')
        .send({ cod_autor: 100 });

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response._body.erro, 'O autor não foi encontrado.');
});
