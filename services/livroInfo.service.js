import LivroInfoRepository from '../repositories/livroInfo.repository.js';
import livroService from './livro.service.js';

async function createLivroInfo(livroInfo) {
  await livroService.getLivro(livroInfo.livroId);
  return await LivroInfoRepository.createLivroInfo(livroInfo);
}

async function getLivrosInfo() {
  const livros = await LivroInfoRepository.getLivrosInfo();
  if (livros.length === 0) {
    throw new Error('Não existe informações na tabela livros.');
  }
  return livros;
}

async function getLivroInfo(livroInfoId) {
  const livro = await LivroInfoRepository.getLivroInfo(parseInt(livroInfoId));
  if (!livro) {
    throw new Error('O Livro ID informado não existe.');
  }
  return livro;
}

async function updateLivroInfo(livroInfo) {
  await getLivroInfo(livroInfo.livroId);
  return await LivroInfoRepository.updateLivroInfo(livroInfo);
}

async function deleteLivroInfo(livroInfoId) {
  await getLivroInfo(livroInfoId);
  return await LivroInfoRepository.deleteLivroInfo(livroInfoId);
}

async function createAvaliacoes(livro) {
  await getLivroInfo(livro.livroId);
  return await LivroInfoRepository.createAvaliacoes(livro);
}

async function deleteAvaliacoes(livroId, index) {
  await getLivroInfo(livroId);
  return await LivroInfoRepository.deleteAvaliacoes(parseInt(livroId), index);
}

export default {
  createLivroInfo,
  getLivrosInfo,
  getLivroInfo,
  updateLivroInfo,
  deleteLivroInfo,
  createAvaliacoes,
  deleteAvaliacoes,
};
