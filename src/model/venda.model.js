import Sequelize from 'sequelize';
import db from '../repositories/db.js';
import Cliente from './cliente.model.js';
import Livro from './livro.model.js';

const Venda = db.define(
    'vendas',
    {
        cod_venda: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        valor: {
            type: Sequelize.DECIMAL(5, 2),
            allowNull: false,
        },
        data: {
            type: Sequelize.DATE,
            allowNull: false,
        },
    },
    { underscored: true },
);

Venda.belongsTo(Cliente, { foreignKey: 'cod_cliente' });
Cliente.hasMany(Venda, { foreignKey: 'cod_cliente' });

Venda.belongsTo(Livro, { foreignKey: 'cod_livro' });
Livro.hasMany(Venda, { foreignKey: 'cod_livro' });

export default Venda;
