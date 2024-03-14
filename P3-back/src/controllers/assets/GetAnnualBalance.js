const Users = require("../../models/Users");
const Transacoes = require("../../models/Transacoes");
const { Op } = require("sequelize");

async function GetAnnualBalance(req, res) {
    try {
        const user = await Users.findOne({ where: { email: req.body.email } });

        if (user) {
            const dataAtual = new Date();
            const mesAtual = dataAtual.getMonth() + 1;
            const anoAtual = dataAtual.getFullYear();

            // Inicializar objeto para armazenar o saldo por mês
            const saldoPorMes = {};

            // Calcular todos os meses do ano até o mês atual
            for (let mes = 1; mes <= mesAtual; mes++) {
                const chave = `${anoAtual}-${mes.toString().padStart(2, "0")}`;
                saldoPorMes[chave] = 0; // Inicializar o saldo como 0 para cada mês
            }

            // Recuperar transações até o mês atual
            const transacoes = await Transacoes.findAll({
                where: {
                    idusuario: user.idusuarios,
                    data: {
                        [Op.lte]: `${anoAtual}-${mesAtual}-31`, // Último dia do mês atual
                    },
                },
            });

            // Iterar sobre as transações e calcular saldo por mês
            transacoes.forEach((transacao) => {
                const [anoTransacao, mesTransacao, _] =
                    transacao.data.split("-");
                const chave = `${anoTransacao}-${mesTransacao}`;

                // Se a transação for uma receita, adicione ao saldo, senao, subtraia
                const valor =
                    transacao.tipo === "receita"
                        ? transacao.valor
                        : -transacao.valor;

                saldoPorMes[chave] += valor;
            });

            return res.json({ status: 200, saldoPorMes: saldoPorMes });
        } else {
            return res.json({
                status: 401,
                error: "Usuário não identificado!",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json(404);
    }
}

module.exports = GetAnnualBalance;
