import VendaRepository from '../repositories/venda.repository.js';
import LivroRepository from '../repositories/livro.repository.js';
import ClienteService from '../services/cliente.service.js';
import LivroService from '../services/livro.service.js';
import autorService from './autor.service.js';
import Venda from '../model/venda.model.js';

async function createVenda(venda) {
  await ClienteService.getCliente(venda.clienteId);
  await LivroService.getLivro(venda.livroId);

  const produto = await LivroRepository.getLivro(venda.livroId);

  if (produto.estoque > 0) {
    venda = await VendaRepository.insertVenda(venda);
    produto.estoque--;
    await LivroRepository.updateLivro(produto);
    return venda;
  } else {
    throw new Error('O Livro informado não possui estoque.');
  }
}

async function getVendas(clienteId, livroId, autorId) {
  try {
    if (clienteId) {
      await ClienteService.getCliente(clienteId);

      const vendas = await VendaRepository.getVendasByClienteId(clienteId);

      if (vendas.length === 0) {
        throw new Error('O Cliente ID informado não tem compras cadastradas.');
      }
      return vendas;
    }

    if (livroId) {
      await LivroService.getLivro(livroId);

      const vendas = await VendaRepository.getVendasByLivroId(livroId);

      if (vendas.length === 0) {
        throw new Error('O Livro ID informado não tem vendas cadastradas.');
      }
      return vendas;
    }

    if (autorId) {
      await autorService.getAutor(autorId);

      const vendas = await VendaRepository.getVendasByAutorId(autorId);

      if (vendas.length === 0) {
        throw new Error('O Autor ID informado não tem vendas do livro cadastradas.');
      }
      return vendas;
    }

    const venda = await VendaRepository.getVendas();
    if (venda.length === 0) {
      throw new Error('Não existe informações na tabela');
    }
    return await venda;
  } catch (err) {
    throw err;
  }
}

async function getVenda(vendaId) {
  try {
    const venda = await VendaRepository.getVenda(vendaId);
    if (!venda) {
      throw new Error('A venda ID informada não existe.');
    }
    return await venda;
  } catch (err) {
    throw err;
  }
}

export default {
  createVenda,
  getVendas,
  getVenda,
};
