import vendaService from '../services/venda.service.js';

async function criarVenda(req, res, next) {
    try {
        const venda = req.body;
        const { cod_cliente, cod_livro } = venda;

        if (!cod_cliente || !cod_livro) {
            throw new Error(
                'O código do cliente e código do livro são obrigatórios.',
            );
        }

        const resposta = await vendaService.criarVenda(venda);

        return res.status(201).send(resposta);
    } catch (err) {
        next(err);
    }
}

async function obterInfoVenda(req, res, next) {
    try {
        const resposta = await vendaService.obterInfoVenda(
            req.params.cod_venda,
        );

        return res.status(200).send(resposta);
    } catch (err) {
        next(err);
    }
}

export default {
    criarVenda,
    obterInfoVenda,
};
