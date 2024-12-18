import test from 'node:test';
import assert from 'node:assert';
import supertest from 'supertest';
import app from '../server.js';
import sequelize from '../src/repositories/db.js';
import connect from '../src/repositories/mongo.db.js';
import LivroInfoSchema from '../src/schemas/livroInfo.schema.js';
import {
    criarLivroInfoSucesso,
    criarInfoDeLivroInexistente,
    atualizarLivroInfoSucesso,
    criarAvaliacaoLivroSucesso,
    criarAvaliacaoDeLivroInexistente,
} from './mock/livroInfo.mock.js';
import { criarAutorSucesso } from './mock/autor.mock.js';
import { criarLivroSucesso } from './mock/livro.mock.js';

const request = supertest(app);
await sequelize.drop();
await sequelize.sync();

const mongoose = await connect();
const LivroInfo = mongoose.model('livroInfo', LivroInfoSchema);
await LivroInfo.deleteMany();

await request.post('/api/v1/autor/cadastrar').send(criarAutorSucesso);
await request.post('/api/v1/livro/cadastrar').send(criarLivroSucesso);

test('LivroInfo', async (testing) => {
    await testing.test('Criação informação do livro - Sucesso', async () => {
        const response = await request
            .post('/api/v1/livroInfo/cadastrar')
            .send(criarLivroInfoSucesso);

        assert.strictEqual(response.status, 201);
    });

    await testing.test(
        'Criação informação do livro - Livro inexistente',
        async () => {
            const response = await request
                .post('/api/v1/livroInfo/cadastrar')
                .send(criarInfoDeLivroInexistente);

            assert.strictEqual(response.status, 400);
            assert.strictEqual(
                response._body.erro,
                'O livro não foi encontrado.',
            );
        },
    );

    await testing.test(
        'Criação informação do livro - Dados faltantes',
        async () => {
            const response = await request.post('/api/v1/livroInfo/cadastrar');

            assert.strictEqual(response.status, 400);
            assert.strictEqual(
                response._body.erro,
                'O Código do Livro, Descrição, Páginas e Editora são obrigatórios.',
            );
        },
    );

    await testing.test(
        'Obtenção das informações do livro - Sucesso',
        async () => {
            const response = await request.get('/api/v1/livroInfo/1');

            assert.strictEqual(response.status, 200);
            assert.notStrictEqual(response.body.livro, null);
            assert.notStrictEqual(response.body.livroInfo, null);
        },
    );

    await testing.test(
        'Obtenção das informações do livro - Livro inexistente',
        async () => {
            const response = await request.get('/api/v1/livroInfo/100');

            assert.strictEqual(response.status, 400);
            assert.strictEqual(
                response._body.erro,
                'O livro não foi encontrado.',
            );
        },
    );

    await testing.test(
        'Atualização das informações do livro - Sucesso',
        async () => {
            const response = await request
                .patch('/api/v1/livroInfo/atualizar')
                .send(atualizarLivroInfoSucesso);

            assert.strictEqual(response.status, 200);
            assert.strictEqual(
                response._body.paginas,
                atualizarLivroInfoSucesso.paginas,
            );
        },
    );

    await testing.test(
        'Atualização das informações do livro - Livro inexistente',
        async () => {
            const response = await request
                .patch('/api/v1/livroInfo/atualizar')
                .send({ cod_livro: 100 });

            assert.strictEqual(response.status, 400);
            assert.strictEqual(
                response._body.erro,
                'As informações do livro não foram encontradas.',
            );
        },
    );

    await testing.test(
        'Atualização das informações do livro - Dados faltantes',
        async () => {
            const response = await request.patch('/api/v1/livroInfo/atualizar');

            assert.strictEqual(response.status, 400);
            assert.strictEqual(
                response._body.erro,
                'O Código do Livro é obrigatório.',
            );
        },
    );
});

test('Avaliacao', async (testing) => {
    await testing.test('Criação da avaliação do livro - Sucesso', async () => {
        const response = await request
            .post('/api/v1/livroInfo/avaliacao/cadastrar')
            .send(criarAvaliacaoLivroSucesso);

        assert.strictEqual(response.status, 201);
    });

    await testing.test(
        'Criação da avaliação do livro - Livro inexistente',
        async () => {
            const response = await request
                .post('/api/v1/livroInfo/avaliacao/cadastrar')
                .send(criarAvaliacaoDeLivroInexistente);

            assert.strictEqual(response.status, 400);
            assert.strictEqual(
                response._body.erro,
                'As informações do livro não foram encontradas.',
            );
        },
    );

    await testing.test(
        'Criação da avaliação do livro - Dados faltantes',
        async () => {
            const response = await request.post(
                '/api/v1/livroInfo/avaliacao/cadastrar',
            );

            assert.strictEqual(response.status, 400);
            assert.strictEqual(
                response._body.erro,
                'O Código do Livro, Nome, Nota e Avaliação são obrigatórios.',
            );
        },
    );

    await testing.test(
        'Obtenção das avaliacoes do livro - Sucesso',
        async () => {
            const response = await request.get('/api/v1/livroInfo/avaliacao/1');

            assert.strictEqual(response.status, 200);
        },
    );

    await testing.test(
        'Obtenção das avaliacoes do livro - Livro inexistente',
        async () => {
            const response = await request.get(
                '/api/v1/livroInfo/avaliacao/100',
            );

            assert.strictEqual(response.status, 400);
            assert.strictEqual(
                response._body.erro,
                'O livro não foi encontrado.',
            );
        },
    );
});
