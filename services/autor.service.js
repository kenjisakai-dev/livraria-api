import AutorRepository from '../repositories/autor.repository.js';

async function createAutor(autor) {
  return await AutorRepository.insertAutor(autor);
}

async function getAutores() {
  const autores = await AutorRepository.getAutores();
  if (autores.length === 0) {
    throw new Error('Não existe informações na tabela autores.');
  }
  return autores;
}

async function getAutor(autorId) {
  const autor = await AutorRepository.getAutor(autorId);
  if (!autor) {
    throw new Error('O Autor ID informado não existe.');
  }
  return autor;
}

async function updateAutor(autor) {
  await getAutor(autor.autorId);
  return await AutorRepository.updateAutor(autor);
}

async function deleteAutor(autorId) {
  await getAutor(autorId);
  return await AutorRepository.deleteAutor(autorId);
  // antes de excluir um autor, verificar se existem livros
  // cadastrados para ele. Caso exista, bloquear a exclusão
}

export default {
  createAutor,
  getAutores,
  getAutor,
  updateAutor,
  deleteAutor,
};
