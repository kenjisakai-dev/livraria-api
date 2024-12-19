import Cliente from '../model/cliente.model.js';
import Venda from '../model/venda.model.js';
import Livro from '../model/livro.model.js';

async function criarCliente(cliente) {
    try {
        const { cod_cliente } = await Cliente.create(cliente);
        return obterCliente(cod_cliente);
    } catch (erro) {
        throw new Error(erro.message);
    }
}

async function obterCliente(cod_cliente) {
    try {
        return await Cliente.findByPk(cod_cliente, {
            attributes: { exclude: ['senha'] },
        });
    } catch (erro) {
        throw new Error(erro.message);
    }
}

async function obterInfoCliente(cod_cliente) {
    try {
        return await Cliente.findOne({
            where: { cod_cliente },
            attributes: { exclude: ['senha'] },
            include: [
                {
                    model: Venda,
                    attributes: { exclude: ['cod_cliente', 'cod_livro'] },
                    include: [
                        {
                            model: Livro,
                        },
                    ],
                },
            ],
        });
    } catch (erro) {
        throw new Error(erro.message);
    }
}

async function atualizarCliente(cliente) {
    try {
        await Cliente.update(cliente, {
            where: {
                cod_cliente: cliente.cod_cliente,
            },
        });

        return await obterCliente(cliente.cod_cliente);
    } catch (erro) {
        throw new Error(erro.message);
    }
}

export default {
    criarCliente,
    obterCliente,
    obterInfoCliente,
    atualizarCliente,
};
