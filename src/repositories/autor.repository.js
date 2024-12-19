import Autor from '../model/autor.model.js';
import Livro from '../model/livro.model.js';
import Venda from '../model/venda.model.js';

async function criarAutor(autor) {
    try {
        return await Autor.create(autor);
    } catch (erro) {
        throw new Error(erro.message);
    }
}

async function obterAutor(cod_autor) {
    try {
        return await Autor.findByPk(cod_autor);
    } catch (erro) {
        throw new Error(erro.message);
    }
}

async function obterInfoAutor(cod_autor) {
    try {
        return await Autor.findOne({
            where: { cod_autor },
            include: [
                {
                    model: Livro,
                    attributes: { exclude: ['cod_autor'] },
                    include: [
                        {
                            model: Venda,
                            attributes: {
                                exclude: ['cod_cliente', 'cod_livro'],
                            },
                        },
                    ],
                },
            ],
        });
    } catch (erro) {
        throw new Error(erro.message);
    }
}

async function atualizarAutor(autor) {
    try {
        await Autor.update(autor, {
            where: {
                cod_autor: autor.cod_autor,
            },
        });

        return await obterAutor(autor.cod_autor);
    } catch (erro) {
        throw new Error(erro.message);
    }
}

export default {
    criarAutor,
    obterAutor,
    obterInfoAutor,
    atualizarAutor,
};
