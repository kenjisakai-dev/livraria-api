import Livro from '../model/livro.model.js';
import LivroInfoService from '../services/livroInfo.service.js';

async function createLivroInfo(req, res, next) {
  try {
    let livroInfo = req.body;
    if (
      !livroInfo.livroId ||
      !livroInfo.descricao ||
      !livroInfo.paginas ||
      !livroInfo.editora ||
      !livroInfo.avaliacoes
    ) {
      throw new Error('O Livro ID, descrição, páginas, editora e Avaliações são obrigatórios.');
    }
    res.send(await LivroInfoService.createLivroInfo(livroInfo));
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
}

async function getLivrosInfo(req, res, next) {
  try {
    res.send(await LivroInfoService.getLivrosInfo());
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
}

async function getLivroInfo(req, res, next) {
  try {
    res.send(await LivroInfoService.getLivroInfo(req.params.id));
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
}

async function updateLivroInfo(req, res, next) {
  try {
    let livroInfo = req.body;
    if (!livroInfo.livroId) throw new Error('O Livro ID é obrigatório.');
    res.send(await LivroInfoService.updateLivroInfo(livroInfo));
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
}

async function deleteLivroInfo(req, res, next) {
  try {
    res.send({
      messagem: 'O Livro ID informado foi deletedo.',

      livro: await LivroInfoService.deleteLivroInfo(req.params.id),
    });
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
}

async function createAvaliacoes(req, res, next) {
  try {
    let livro = req.body;
    if (!livro.livroId || !livro.avaliacoes) {
      throw new Error('O Livro ID e Avaliações são obrigatórios.');
    }
    livro = await LivroInfoService.createAvaliacoes(livro);
    res.send(livro);
  } catch (err) {
    throw err;
  }
}

async function deleteAvaliacoes(req, res, next) {
  try {
    res.send({
      messagem: 'A Avaliação do livro foi deletada.',
      avaliação: await LivroInfoService.deleteAvaliacoes(req.params.id, req.params.index),
    });
  } catch (err) {
    throw err;
  }
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
