const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("p3_app", "root", "", {
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
});

const Financas = sequelize.define(
    "financas",
    {
        idfinancas: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idusuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        receita: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
        despesas: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
        cartao: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
    },
    {
        // Não adicione os atributos de timestamp (updatedAt, createdAt)
        timestamps: false,
    }
);

// Estabelecendo a relação de chave estrangeira
const Usuario = require("./Users");
Financas.belongsTo(Usuario, { foreignKey: "idusuario" });

module.exports = Financas;
