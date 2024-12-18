import livroService from '../services/livro.service.js';

async function criarLivro(req, res, next) {
    try {
        const livro = req.body;
        const { nome, valor, estoque, cod_autor } = livro;

        if (!nome || valor == null || !estoque || !cod_autor) {
            throw new Error(
                'O Nome, Valor, Estoque e código do Autor são obrigatórios.',
            );
        }

        const resposta = await livroService.criarLivro(livro);

        return res.status(201).send(resposta);
    } catch (err) {
        next(err);
    }
}

async function obterInfoLivro(req, res, next) {
    try {
        const resposta = await livroService.obterInfoLivro(
            req.params.cod_livro,
        );

        return res.status(200).send(resposta);
    } catch (err) {
        next(err);
    }
}

async function atualizarLivro(req, res, next) {
    try {
        const livro = req.body;
        const { cod_livro } = livro;

        if (!cod_livro) {
            throw new Error('O código do livro é obrigatório.');
        }

        const resposta = await livroService.atualizarLivro(livro);

        return res.status(200).send(resposta);
    } catch (err) {
        next(err);
    }
}

export default {
    criarLivro,
    obterInfoLivro,
    atualizarLivro,
};
