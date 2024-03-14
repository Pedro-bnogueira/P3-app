const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('p3_app', 'root', '', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql',
});

const Notes = sequelize.define('notes', {
  idnote: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idusuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  idpage: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  texto: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  data: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Não adicione os atributos de timestamp (updatedAt, createdAt)
  timestamps: false
});

// Estabelecendo a relação de chave estrangeira
const NotePages = require('./NotePages');
Notes.belongsTo(NotePages, { foreignKey: 'idusuario' });
Notes.belongsTo(NotePages, { foreignKey: 'idpage' });

module.exports = Notes;
