import Cliente from '../model/cliente.model.js';

async function insertCliente(cliente) {
  try {
    return await Cliente.create(cliente);
  } catch (err) {
    throw err;
  }
}

async function getClientes() {
  try {
    return await Cliente.findAll();
  } catch (err) {
    throw err;
  }
}

async function getCliente(clienteId) {
  try {
    return await Cliente.findByPk(clienteId);
  } catch (err) {
    throw err;
  }
}

async function updateCliente(cliente) {
  try {
    await Cliente.update(cliente, {
      where: {
        clienteId: cliente.clienteId,
      },
    });
    return await getCliente(cliente.clienteId);
  } catch (err) {
    throw err;
  }
}

async function deleteCliente(clienteId) {
  try {
    const cliente = await getCliente(clienteId);
    await Cliente.destroy({
      where: {
        clienteId,
      },
    });
    return cliente;
  } catch (err) {
    throw err;
  }
}

export default {
  insertCliente,
  getClientes,
  getCliente,
  updateCliente,
  deleteCliente,
};
