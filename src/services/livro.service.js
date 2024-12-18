import livroRepository from '../repositories/livro.repository.js';
import autorService from '../services/autor.service.js';

async function criarLivro(livro) {
    await autorService.obterAutor(livro.cod_autor);
    return await livroRepository.criarLivro(livro);
}

async function obterLivro(cod_livro) {
    const livro = await livroRepository.obterLivro(cod_livro);

    if (!livro) {
        throw new Error('O livro não foi encontrado.');
    }

    return livro;
}

async function obterInfoLivro(cod_livro) {
    await obterLivro(cod_livro);
    return await livroRepository.obterInfoLivro(cod_livro);
}

async function atualizarLivro(livro) {
    await obterLivro(livro.cod_livro);

    if (livro.cod_autor) {
        await autorService.obterAutor(livro.cod_autor);
    }

    return await livroRepository.atualizarLivro(livro);
}

export default {
    criarLivro,
    obterLivro,
    obterInfoLivro,
    atualizarLivro,
};
