import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  'postgres://kannitab:h25Lh5Pzs3q9P5OU79z6O5tpyDod4iVU@tiny.db.elephantsql.com/kannitab',
  {
    dialect: 'postgres',
    define: {
      timestamps: false,
    },
  }
);

export default sequelize;
