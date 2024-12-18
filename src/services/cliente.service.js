import clienteRepository from '../repositories/cliente.repository.js';

async function criarCliente(cliente) {
    return await clienteRepository.criarCliente(cliente);
}

async function obterCliente(cod_cliente) {
    const cliente = await clienteRepository.obterCliente(cod_cliente);

    if (!cliente) {
        throw new Error('O cliente não foi encontrado.');
    }

    return cliente;
}

async function obterInfoCliente(cod_cliente) {
    await obterCliente(cod_cliente);
    return await clienteRepository.obterInfoCliente(cod_cliente);
}

async function atualizarCliente(cliente) {
    await obterCliente(cliente.cod_cliente);
    return await clienteRepository.atualizarCliente(cliente);
}

export default {
    criarCliente,
    obterCliente,
    obterInfoCliente,
    atualizarCliente,
};
