import AutorService from '../services/autor.service.js';

async function createAutor(req, res, next) {
  try {
    let autor = req.body;
    if (!autor.nome || !autor.email || !autor.telefone) {
      throw new Error('O Nome, Email, e Telefone são obrigatórios.');
    }
    res.send(await AutorService.createAutor(autor));
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
}

async function getAutores(req, res, next) {
  try {
    res.send(await AutorService.getAutores());
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
}

async function getAutor(req, res, next) {
  try {
    res.send(await AutorService.getAutor(req.params.id));
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
}

async function updateAutor(req, res, next) {
  try {
    res.send(await AutorService.updateAutor(req.body));
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
}

async function deleteAutor(req, res, next) {
  try {
    res.send({
      message: 'O Autor ID informado foi deletedo.',
      autor: await AutorService.deleteAutor(req.params.id),
    });
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
}

export default {
  createAutor,
  getAutores,
  getAutor,
  updateAutor,
  deleteAutor,
};
