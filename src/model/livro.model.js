import Sequelize from 'sequelize';
import db from '../repositories/db.js';
import Autor from './autor.model.js';

const Livro = db.define(
    'livros',
    {
        cod_livro: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        valor: {
            type: Sequelize.DECIMAL(5, 2),
            allowNull: false,
        },
        estoque: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    },
    { underscored: true },
);

Livro.belongsTo(Autor, { foreignKey: 'cod_autor' });
Autor.hasMany(Livro, { foreignKey: 'cod_autor' });

export default Livro;
