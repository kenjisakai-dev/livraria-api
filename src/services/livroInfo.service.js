import livroInfoRepository from '../repositories/livroInfo.repository.js';
import livroService from './livro.service.js';

async function criarLivroInfo(livroInfo) {
    await livroService.obterLivro(livroInfo.cod_livro);

    const livroInfoObtido = await livroInfoRepository.obterLivroInfo(
        livroInfo.cod_livro,
    );

    if (livroInfoObtido) {
        throw new Error('As informações do livro já existem.');
    }

    return await livroInfoRepository.criarInfoLivro(livroInfo);
}

async function obterLivroInfo(cod_livro) {
    const livro = await livroService.obterLivro(cod_livro);
    const livroInfo = await livroInfoRepository.obterLivroInfo(cod_livro);

    return { livro, livroInfo };
}

async function atualizarLivroInfo(livroInfo) {
    const livroInfoObtido = await livroInfoRepository.obterLivroInfo(
        livroInfo.cod_livro,
    );

    if (!livroInfoObtido) {
        throw new Error('As informações do livro não foram encontradas.');
    }

    return await livroInfoRepository.atualizarLivroInfo(livroInfo);
}

async function criarAvaliacao(avaliacao) {
    const livroInfo = await livroInfoRepository.obterLivroInfo(
        avaliacao.cod_livro,
    );

    if (!livroInfo) {
        throw new Error('As informações do livro não foram encontradas.');
    }

    if (avaliacao.nota < 0) avaliacao.nota = 0;
    if (avaliacao.nota > 5) avaliacao.nota = 5;

    livroInfo.avaliacoes.push(avaliacao);

    return await livroInfoRepository.atualizarLivroInfo(livroInfo);
}

export default {
    criarLivroInfo,
    obterLivroInfo,
    atualizarLivroInfo,
    criarAvaliacao,
};
