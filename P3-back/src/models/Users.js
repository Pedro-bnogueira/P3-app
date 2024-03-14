const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('p3_app', 'root', '', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql',
});

const Usuario = sequelize.define('usuario', {
  idusuarios: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Não adicione os atributos de timestamp (updatedAt, createdAt)
  timestamps: false
});

module.exports = Usuario;
