const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("p3_app", "root", "", {
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
});

const Transacoes = sequelize.define(
    "transacoes",
    {
        idtransacao: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        idfinancas: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        idusuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        valor: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        data: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        // Não adicione os atributos de timestamp (updatedAt, createdAt)
        timestamps: false,
    }
);

// Estabelecendo a relação de chave estrangeira
const Usuario = require("./Users");
Transacoes.belongsTo(Usuario, { foreignKey: "idusuario" });

const Financas = require("./Financas");
Transacoes.belongsTo(Financas, { foreignKey: "idfinancas" });

module.exports = Transacoes;
