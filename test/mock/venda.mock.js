export const criarVendaSucesso = {
    cod_cliente: 1,
    cod_livro: 1,
};

export const criarVendaComClienteInexistente = {
    cod_cliente: 100,
    cod_livro: 1,
};

export const criarVendaComLivroInexistente = {
    cod_cliente: 1,
    cod_livro: 100,
};

export const atualizarVendaSucesso = {
    cod_venda: 1,
    cod_cliente: 1,
    cod_livro: 1,
};

export const atualizarVendaComAutorInexistente = {
    cod_livro: 1,
    valor: '82.70',
    cod_autor: 100,
};
