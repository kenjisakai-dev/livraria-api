import Autor from '../model/autor.model.js';

async function insertAutor(autor) {
  try {
    return await Autor.create(autor);
  } catch (err) {
    throw err;
  }
}

async function getAutores() {
  try {
    return await Autor.findAll();
  } catch (err) {
    throw err;
  }
}

async function getAutor(autorId) {
  try {
    return await Autor.findByPk(autorId);
  } catch (err) {
    throw err;
  }
}

async function updateAutor(autor) {
  try {
    await Autor.update(autor, {
      where: {
        autorId: autor.autorId,
      },
    });
    return await getAutor(autor.autorId);
  } catch (err) {
    throw err;
  }
}

async function deleteAutor(autorId) {
  try {
    const autor = await getAutor(autorId);
    await Autor.destroy({
      where: {
        autorId,
      },
    });
    return autor;
  } catch (err) {
    throw err;
  }
}

export default {
  insertAutor,
  getAutores,
  getAutor,
  updateAutor,
  deleteAutor,
};
