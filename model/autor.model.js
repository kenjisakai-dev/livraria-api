import Sequelize from 'sequelize';
import db from '../repositories/db.js';

const Autor = db.define(
  'autores',
  {
    autorId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    email: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    telefone: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { underscored: true }
);

export default Autor;
