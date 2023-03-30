import Venda from '../model/venda.model.js';
import Livro from '../model/livro.model.js';

async function insertVenda(venda) {
  try {
    const livro = await Livro.findByPk(venda.livroId);
    return await Venda.create({
      valor: livro.valor,
      data: new Date(),
      clienteId: venda.clienteId,
      livroId: venda.livroId,
    });
  } catch (err) {
    throw err;
  }
}

async function getVendas() {
  try {
    return await Venda.findAll();
  } catch (err) {
    throw err;
  }
}

async function getVenda(vendaId) {
  try {
    return await Venda.findByPk(vendaId);
  } catch (err) {
    throw err;
  }
}

async function getVendasByClienteId(clienteId) {
  try {
    return await Venda.findAll({
      where: {
        clienteId,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function getVendasByLivroId(livroId) {
  try {
    return await Venda.findAll({
      where: {
        livroId,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function getVendasByAutorId(autorId) {
  try {
    return await Venda.findAll({
      include: [
        {
          model: Livro,
          where: {
            autorId,
          },
        },
      ],
    });
  } catch (err) {
    throw err;
  }
}

export default {
  insertVenda,
  getVendas,
  getVenda,
  getVendasByClienteId,
  getVendasByLivroId,
  getVendasByAutorId,
};
