import ClienteRepository from '../repositories/cliente.repository.js';

async function createCliente(cliente) {
  return await ClienteRepository.insertCliente(cliente);
}

async function getClientes() {
  const clientes = await ClienteRepository.getClientes();
  if (clientes.length === 0) {
    throw new Error('Não existe informações na tabela clientes.');
  }
  return clientes;
}

async function getCliente(clientId) {
  const cliente = await ClienteRepository.getCliente(clientId);
  if (!cliente) {
    throw new Error('O Cliente ID informado não existe.');
  }
  return cliente;
}

async function updateCliente(cliente) {
  await getCliente(cliente.clienteId);
  return await ClienteRepository.updateCliente(cliente);
}

async function deleteCliente(clienteId) {
  await getCliente(clienteId);
  return await ClienteRepository.deleteCliente(clienteId);
  // tarefa: se o cliente tiver compra, o registro não pode ser apagado
}

export default {
  createCliente,
  getClientes,
  getCliente,
  updateCliente,
  deleteCliente,
};
