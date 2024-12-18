import livroInfoService from '../services/livroInfo.service.js';

async function criarLivroInfo(req, res, next) {
    try {
        const livroInfo = req.body;
        const { cod_livro, descricao, paginas, editora } = livroInfo;

        if (!cod_livro || !descricao || !paginas || !editora) {
            throw new Error(
                'O Código do Livro, Descrição, Páginas e Editora são obrigatórios.',
            );
        }

        const resposta = await livroInfoService.criarLivroInfo(livroInfo);

        return res.status(201).send(resposta);
    } catch (err) {
        next(err);
    }
}

async function obterLivroInfo(req, res, next) {
    try {
        const resposta = await livroInfoService.obterLivroInfo(
            req.params.cod_livro,
        );

        return res.status(200).send(resposta);
    } catch (err) {
        next(err);
    }
}

async function atualizarLivroInfo(req, res, next) {
    try {
        const livroInfo = req.body;
        const { cod_livro } = livroInfo;

        if (!cod_livro) throw new Error('O Código do Livro é obrigatório.');

        const resposta = await livroInfoService.atualizarLivroInfo(livroInfo);

        return res.status(200).send(resposta);
    } catch (err) {
        next(err);
    }
}

async function criarAvaliacao(req, res, next) {
    try {
        const livro = req.body;
        const { cod_livro, nome, nota, avaliacao } = livro;

        if (!cod_livro || !nome || nota == null || !avaliacao) {
            throw new Error(
                'O Código do Livro, Nome, Nota e Avaliação são obrigatórios.',
            );
        }

        const resposta = await livroInfoService.criarAvaliacao(livro);

        return res.status(201).send(resposta);
    } catch (err) {
        next(err);
    }
}

async function obterAvaliacoes(req, res, next) {
    try {
        const resposta = await livroInfoService.obterLivroInfo(
            req.params.cod_livro,
        );

        return res.status(200).send(resposta.livroInfo);
    } catch (err) {
        next(err);
    }
}

export default {
    criarLivroInfo,
    obterLivroInfo,
    atualizarLivroInfo,
    criarAvaliacao,
    obterAvaliacoes,
};
