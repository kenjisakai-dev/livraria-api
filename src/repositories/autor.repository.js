import Autor from '../model/autor.model.js';
import Livro from '../model/livro.model.js';

async function criarAutor(autor) {
    try {
        return await Autor.create(autor);
    } catch (err) {
        throw err;
    }
}

async function obterAutor(cod_autor) {
    try {
        return await Autor.findByPk(cod_autor);
    } catch (err) {
        throw err;
    }
}

async function obterInfoAutor(cod_autor) {
    try {
        return await Autor.findOne({
            where: { cod_autor },
            include: [
                {
                    model: Livro,
                },
            ],
        });
    } catch (err) {
        throw err;
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
    } catch (err) {
        throw err;
    }
}

export default {
    criarAutor,
    obterAutor,
    obterInfoAutor,
    atualizarAutor,
};
