import VendaService from '../services/venda.service.js';

async function createVenda(req, res, next) {
  try {
    let venda = req.body;
    if (!venda.clienteId || !venda.livroId) {
      throw new Error('O Cliente ID e Livro ID são obrigatórios.');
    }
    res.send(await VendaService.createVenda(venda));
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
}

async function getVendas(req, res, next) {
  try {
    res.send(
      await VendaService.getVendas(req.query.clienteId, req.query.livroId, req.query.autorId)
    );
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
}

async function getVenda(req, res, next) {
  try {
    res.send(await VendaService.getVenda(req.params.id));
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
}

export default {
  createVenda,
  getVendas,
  getVenda,
};
