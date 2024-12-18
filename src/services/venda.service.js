import vendaRepository from '../repositories/venda.repository.js';
import livroService from './livro.service.js';
import livroRepository from '../repositories/livro.repository.js';
import clienteService from './cliente.service.js';

async function criarVenda(venda) {
    await clienteService.obterCliente(venda.cod_cliente);
    const livro = await livroService.obterLivro(venda.cod_livro);

    if (livro.estoque === 0) {
        throw new Error('O livro não possui em estoque.');
    }

    venda.data = new Date();
    venda.valor = livro.valor;

    const _venda = await vendaRepository.criarVenda(venda);

    const cod_livro = livro.cod_livro;
    const estoque = --livro.estoque;

    await livroRepository.atualizarLivro({ cod_livro, estoque });

    return _venda;
}

async function obterInfoVenda(cod_venda) {
    const venda = await vendaRepository.obterInfoVenda(cod_venda);

    if (!venda) {
        throw new Error('A venda não foi encontrada.');
    }

    return venda;
}

export default {
    criarVenda,
    obterInfoVenda,
};
