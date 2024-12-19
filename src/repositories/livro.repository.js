import Livro from '../model/livro.model.js';
import Autor from '../model/autor.model.js';
import Venda from '../model/venda.model.js';

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
        const livroInfo = await Livro.findOne({
            where: { cod_livro },
            attributes: { exclude: ['cod_autor'] },
            include: [
                {
                    model: Autor,
                },
                {
                    model: Venda,
                    attributes: { exclude: ['cod_cliente', 'cod_livro'] },
                },
            ],
        });

        const resposta = {
            cod_livro: livroInfo.cod_livro,
            nome: livroInfo.nome,
            valor: livroInfo.valor,
            estoque: livroInfo.estoque,
            createdAt: livroInfo.createdAt,
            updatedAt: livroInfo.updatedAt,
            autor: livroInfo.autore,
            vendas: livroInfo.vendas,
        };

        return resposta;
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
