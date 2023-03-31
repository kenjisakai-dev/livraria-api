import AutorRepository from '../repositories/autor.repository.js';
import VendaRepository from '../repositories/venda.repository.js';

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

  const vendas = await VendaRepository.getVendasByAutorId(autorId);
  if (vendas.length > 0) {
    throw new Error('O Autor ID informado tem vendas do livro cadastradas.');
  }

  return await AutorRepository.deleteAutor(autorId);
}

export default {
  createAutor,
  getAutores,
  getAutor,
  updateAutor,
  deleteAutor,
};
