import autorService from '../services/autor.service.js';

async function criarAutor(req, res, next) {
    try {
        const autor = req.body;
        const { nome, email, telefone } = autor;

        if (!nome || !email || !telefone) {
            throw new Error('O Nome, Email e Telefone são obrigatórios.');
        }

        const resposta = await autorService.criarAutor(autor);

        return res.status(201).send(resposta);
    } catch (err) {
        next(err);
    }
}

async function obterInfoAutor(req, res, next) {
    try {
        const resposta = await autorService.obterInfoAutor(
            req.params.cod_autor,
        );

        return res.status(200).send(resposta);
    } catch (err) {
        next(err);
    }
}

async function atualizarAutor(req, res, next) {
    try {
        const autor = req.body;
        const { cod_autor } = autor;

        if (!cod_autor) {
            throw new Error('O código do autor é obrigatório.');
        }

        const resposta = await autorService.atualizarAutor(autor);

        return res.status(200).send(resposta);
    } catch (err) {
        next(err);
    }
}

export default {
    criarAutor,
    obterInfoAutor,
    atualizarAutor,
};
