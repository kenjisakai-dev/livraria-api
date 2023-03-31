import ClienteRepository from '../repositories/cliente.repository.js';
import VendaRepository from '../repositories/venda.repository.js';

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

async function getCliente(clienteId) {
  const cliente = await ClienteRepository.getCliente(clienteId);
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

  const vendas = await VendaRepository.getVendasByClienteId(clienteId);
  if (vendas.length > 0) {
    throw new Error('O Cliente ID informado possui compras cadastradas.');
  }

  return await ClienteRepository.deleteCliente(clienteId);
}

export default {
  createCliente,
  getClientes,
  getCliente,
  updateCliente,
  deleteCliente,
};
