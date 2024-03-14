const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('p3_app', 'root', '', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql',
});

const ActiveSessions = sequelize.define('active_sessions', {
    idactive_sessions: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    user: {
        type: new DataTypes.STRING(255),
        allowNull: false,
    },
    session: {
        type: new DataTypes.STRING(255),
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

module.exports = ActiveSessions;
