import Livro from '../model/livro.model.js';
import Autor from '../model/autor.model.js';

async function criarLivro(livro) {
    try {
        return await Livro.create(livro);
    } catch (erro) {
        throw new Error(erro.message);
    }
}

async function obterLivro(cod_livro) {
    try {
        return await Livro.findByPk(cod_livro);
    } catch (erro) {
        throw new Error(erro.message);
    }
}

async function obterInfoLivro(cod_livro) {
    try {
        return await Livro.findOne({
            where: { cod_livro },
            include: [
                {
                    model: Autor,
                },
            ],
        });
    } catch (erro) {
        throw new Error(erro.message);
    }
}

async function atualizarLivro(livro) {
    try {
        await Livro.update(livro, {
            where: {
                cod_livro: livro.cod_livro,
            },
        });

        return await obterLivro(livro.cod_livro);
    } catch (erro) {
        throw new Error(erro.message);
    }
}

export default {
    criarLivro,
    obterLivro,
    obterInfoLivro,
    atualizarLivro,
};
