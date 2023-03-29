import LivroService from '../services/livro.service.js';

async function createLivro(req, res, next) {
  try {
    let livro = req.body;
    if (!livro.nome || !livro.valor || !livro.estoque || !livro.autorId) {
      throw new Error('O Nome, Valor, Estoque e Autor ID são obrigatórios.');
    }
    res.send(await LivroService.createLivro(livro));
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
}

async function getLivros(req, res, next) {
  try {
    res.send(await LivroService.getLivros(req.query.autorId));
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
}

async function getLivro(req, res, next) {
  try {
    res.send(await LivroService.getLivro(req.params.id));
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
}

async function updateLivro(req, res, next) {
  try {
    let livro = req.body;
    if (!livro.livroId) {
      throw new Error('O Livro ID é obrigatório.');
    }
    if (livro.nome || livro.autorId) {
      throw new Error('O Nome e Autor ID não pode ser alterado.');
    }
    res.send(await LivroService.updateLivro(livro));
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
}

async function deleteLivro(req, res) {
  try {
    res.send({
      message: 'O Livro ID informado foi deletedo.',
      livro: await LivroService.deleteLivro(req.params.id),
    });
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
}

export default {
  createLivro,
  getLivros,
  getLivro,
  updateLivro,
  deleteLivro,
};
