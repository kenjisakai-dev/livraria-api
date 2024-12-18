import autorRepository from '../repositories/autor.repository.js';

async function criarAutor(autor) {
    return await autorRepository.criarAutor(autor);
}

async function obterAutor(cod_autor) {
    const autor = await autorRepository.obterAutor(cod_autor);

    if (!autor) {
        throw new Error('O autor não foi encontrado.');
    }

    return autor;
}

async function obterInfoAutor(cod_autor) {
    await obterAutor(cod_autor);
    return autorRepository.obterInfoAutor(cod_autor);
}

async function atualizarAutor(autor) {
    await obterAutor(autor.cod_autor);
    return await autorRepository.atualizarAutor(autor);
}

export default {
    criarAutor,
    obterAutor,
    obterInfoAutor,
    atualizarAutor,
};
