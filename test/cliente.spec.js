import test from 'node:test';
import assert from 'node:assert';
import supertest from 'supertest';
import app from '../server.js';
import sequelize from '../src/repositories/db.js';
import {
    criarClienteSucesso,
    atualizarClienteSucesso,
} from './mock/cliente.mock.js';

const request = supertest(app);
await sequelize.drop();
await sequelize.sync();

test('Criação do cliente - Sucesso', async () => {
    const response = await request
        .post('/api/v1/cliente/cadastrar')
        .send(criarClienteSucesso);

    assert.strictEqual(response.status, 201);
});

test('Criação do cliente - Dados faltantes', async () => {
    const response = await request.post('/api/v1/cliente/cadastrar');

    assert.strictEqual(response.status, 400);
    assert.strictEqual(
        response._body.erro,
        'O Nome, Email, Senha, Telefone e Endereço são obrigatórios.',
    );
});

test('Obtenção do cliente - Sucesso', async () => {
    const response = await request.get('/api/v1/cliente/info/1');

    assert.strictEqual(response.status, 200);
});

test('Obtenção do cliente - Cliente inexistente', async () => {
    const response = await request.get('/api/v1/cliente/info/100');

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response._body.erro, 'O cliente não foi encontrado.');
});

test('Atualização do cliente - Sucesso', async () => {
    const response = await request
        .patch('/api/v1/cliente/atualizar')
        .send(atualizarClienteSucesso);

    assert.strictEqual(response.status, 200);
    assert.strictEqual(
        response._body.telefone,
        atualizarClienteSucesso.telefone,
    );
});

test('Atualização do cliente - Dados faltantes', async () => {
    const response = await request.patch('/api/v1/cliente/atualizar');

    assert.strictEqual(response.status, 400);
    assert.strictEqual(
        response._body.erro,
        'O código do cliente é obrigatório.',
    );
});

test('Atualização do cliente - Cliente inexistente', async () => {
    const response = await request
        .patch('/api/v1/cliente/atualizar')
        .send({ cod_cliente: 100 });

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response._body.erro, 'O cliente não foi encontrado.');
});
