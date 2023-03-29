import LivroRepository from '../repositories/livro.repository.js';
import LivroInfoRepository from '../repositories/livroInfo.repository.js';
import AutorService from '../services/autor.service.js';

async function createLivro(livro) {
  await AutorService.getAutor(livro.autorId);
  return await LivroRepository.insertLivro(livro);
}

async function getLivros(autorId) {
  if (autorId) {
    await AutorService.getAutor(autorId);

    const livros = await LivroRepository.getLivrosByAutorId(autorId);
    if (livros.length === 0) {
      throw new Error('O Autor ID informado não tem livros cadastrados.');
    }
    return livros;
  }

  const livros = await LivroRepository.getLivros();
  if (livros.length === 0) {
    throw new Error('Não existe informações na tabela livros.');
  }
  return livros;
}

async function getLivro(livroId) {
  const livro = await LivroRepository.getLivro(livroId);
  const livroInfo = await LivroInfoRepository.getLivroInfo(parseInt(livroId));
  const livroInfoAval = livroInfo ? livroInfo : 'Esse Livro não tem avaliações.';
  if (!livro) {
    throw new Error('O Livro ID informado não existe.');
  }
  return { livro, livroInfoAval };
}

async function updateLivro(livro) {
  await getLivro(livro.livroId);
  return await LivroRepository.updateLivro(livro);
}

async function deleteLivro(livroId) {
  await getLivro(livroId);
  return await LivroRepository.deleteLivro(livroId);
  // Exclusão de um livro (antes de excluir um livro, verificar se
  // existem vendas realizadas para ele. Caso exista, bloquear a exclusão
}

export default {
  createLivro,
  getLivros,
  getLivro,
  updateLivro,
  deleteLivro,
};
