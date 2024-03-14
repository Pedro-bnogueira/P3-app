const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('p3_app', 'root', '', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql',
});

const Blacklists = sequelize.define('blacklists', {
    idblacklists: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    user: {
        type: new DataTypes.STRING(255),
        allowNull: false,
    },
    attempts: {
        type: new DataTypes.INTEGER,
        allowNull: false,
    },
    expiresat: {
        type: new DataTypes.DATE,
        allowNull: false,
    },
}, {
  // Não adicione os atributos de timestamp (updatedAt, createdAt)
  timestamps: false
});

module.exports = Blacklists;
