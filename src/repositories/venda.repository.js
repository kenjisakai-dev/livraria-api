import Venda from '../model/venda.model.js';
import Cliente from '../model/cliente.model.js';
import Livro from '../model/livro.model.js';

async function criarVenda(venda) {
    try {
        return await Venda.create(venda);
    } catch (erro) {
        throw new Error(erro.message);
    }
}

async function obterInfoVenda(cod_venda) {
    try {
        return await Venda.findOne({
            where: { cod_venda },
            attributes: { exclude: ['cod_cliente', 'cod_livro'] },
            include: [
                {
                    model: Cliente,
                    attributes: { exclude: ['senha'] },
                },
                {
                    model: Livro,
                },
            ],
        });
    } catch (erro) {
        throw new Error(erro.message);
    }
}

export default {
    criarVenda,
    obterInfoVenda,
};
