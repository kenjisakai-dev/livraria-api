import clienteService from '../services/cliente.service.js';

async function criarCliente(req, res, next) {
    try {
        const cliente = req.body;
        const { nome, email, senha, telefone, endereco } = cliente;

        if (!nome || !email || !senha || !telefone || !endereco) {
            throw new Error(
                'O Nome, Email, Senha, Telefone e Endereço são obrigatórios.',
            );
        }

        const resposta = await clienteService.criarCliente(cliente);

        return res.status(201).send(resposta);
    } catch (err) {
        next(err);
    }
}

async function obterInfoCliente(req, res, next) {
    try {
        const resposta = await clienteService.obterInfoCliente(
            req.params.cod_cliente,
        );

        return res.status(200).send(resposta);
    } catch (err) {
        next(err);
    }
}

async function atualizarCliente(req, res, next) {
    try {
        const cliente = req.body;
        const { cod_cliente } = cliente;

        if (!cod_cliente) {
            throw new Error('O código do cliente é obrigatório.');
        }

        const resposta = await clienteService.atualizarCliente(cliente);

        return res.status(200).send(resposta);
    } catch (err) {
        next(err);
    }
}

export default {
    criarCliente,
    obterInfoCliente,
    atualizarCliente,
};
