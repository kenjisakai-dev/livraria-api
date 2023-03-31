import ClienteService from '../services/cliente.service.js';

async function createCliente(req, res, next) {
  try {
    let cliente = req.body;
    if (
      !cliente.nome ||
      !cliente.email ||
      !cliente.senha ||
      !cliente.telefone ||
      !cliente.endereco
    ) {
      throw new Error('O Nome, Email, Senha, Telefone e Endereço são obrigatórios.');
    }
    res.send(await ClienteService.createCliente(cliente));
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
}

async function getClientes(req, res, next) {
  try {
    res.send(await ClienteService.getClientes());
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
}

async function getCliente(req, res, next) {
  try {
    res.send(await ClienteService.getCliente(req.params.id));
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
}

async function updateCliente(req, res, next) {
  try {
    let cliente = req.body;
    if (!cliente.clienteId) {
      throw new Error('O Cliente ID é obrigatório.');
    }
    res.send(await ClienteService.updateCliente(cliente));
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
}

async function deleteCliente(req, res, next) {
  try {
    res.send({
      message: 'O Cliente ID informado foi deletado.',
      cliente: await ClienteService.deleteCliente(req.params.id),
    });
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
}

export default {
  createCliente,
  getClientes,
  getCliente,
  updateCliente,
  deleteCliente,
};
