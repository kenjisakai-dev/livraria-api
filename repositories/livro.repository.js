import Livro from '../model/livro.model.js';

async function insertLivro(livro) {
  try {
    return await Livro.create(livro);
  } catch (err) {
    throw err;
  }
}

async function getLivros() {
  try {
    return await Livro.findAll();
  } catch (err) {
    throw err;
  }
}

async function getLivro(livroId) {
  try {
    return await Livro.findByPk(livroId);
  } catch (err) {
    throw err;
  }
}

async function updateLivro(livro) {
  try {
    await Livro.update(livro, {
      where: {
        livroId: livro.livroId,
      },
    });
    return await getLivro(livro.livroId);
  } catch (err) {
    throw err;
  }
}

async function deleteLivro(livroId) {
  try {
    const livro = await getLivro(livroId);
    await Livro.destroy({
      where: {
        livroId,
      },
    });
    return livro;
  } catch (err) {
    throw err;
  }
}

async function getLivrosByAutorId(autorId) {
  try {
    return await Livro.findAll({
      where: {
        autorId,
      },
    });
  } catch (err) {
    throw err;
  }
}

export default {
  insertLivro,
  getLivros,
  getLivro,
  updateLivro,
  deleteLivro,
  getLivrosByAutorId,
};
