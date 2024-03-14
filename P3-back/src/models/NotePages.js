const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('p3_app', 'root', '', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql',
});

const NotePages = sequelize.define('note_pages', {
  idnote_pages: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idusuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  // Não adicione os atributos de timestamp (updatedAt, createdAt)
  timestamps: false
});

// Estabelecendo a relação de chave estrangeira
const Usuario = require('./Users');
NotePages.belongsTo(Usuario, { foreignKey: 'idusuario' });

module.exports = NotePages;
