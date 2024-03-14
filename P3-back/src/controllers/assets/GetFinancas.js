const Users = require('../../models/Users');
const Financas = require('../../models/Financas');
const Transacoes = require("../../models/Transacoes");
const { Op } = require("sequelize");

async function GetFinancas(req, res){
    try {
        const user = await Users.findOne({where: {email: req.body.email}});

        if(user) {
            const finances = await Financas.findOne({where: {idusuario: user.idusuarios}})

            const dataAtual = new Date();
            const mesAtual = dataAtual.getMonth() + 1;
            const anoAtual = dataAtual.getFullYear();

            // Inicializar objeto para armazenar o saldo, receita, despesa e cartão do mês atual
            let receitaMesAtual = 0;
            let despesaMesAtual = 0;
            let cartaoMesAtual = 0;

            // Recuperar transações até o mês atual
            const transacoes = await Transacoes.findAll({
                where: {
                    idusuario: user.idusuarios,
                    data: {
                        [Op.lte]: `${anoAtual}-${mesAtual}-31`, // Último dia do mês atual
                    },
                },
            });

            // Iterar sobre as transações do mês atual e calcular saldo, receita, despesa e cartão
            transacoes.forEach((transacao) => {
                const [anoTransacao, mesTransacao, _] = transacao.data.split("-");
            
                if (anoTransacao === anoAtual.toString() && mesTransacao === mesAtual.toString().padStart(2, '0')) {
                    // Se a transação for uma receita, adicione ao saldo e à receita do mês
                    if (transacao.tipo === "receita") {
                        receitaMesAtual += transacao.valor;
                    }
                    // Se a transação for uma despesa, subtraia do saldo e adicione à despesa do mês
                    else if (transacao.tipo === "despesa") {
                        despesaMesAtual += transacao.valor;
                    }
                    // Se a transação for um cartão, adicione ao cartão do mês
                    else if (transacao.tipo === "cartao") {
                        cartaoMesAtual += transacao.valor;
                    }
                }
            });

            await Financas.update({receita: receitaMesAtual, despesas: despesaMesAtual, cartao: cartaoMesAtual}, {where: {idfinancas: finances.idfinancas}});

            if(finances){
                return res.json({status: 200, receita: receitaMesAtual, despesas: despesaMesAtual, cartao: cartaoMesAtual})
            }
            else {
                return res.json({status: 400})
            }
        }
        else {
            return res.json({status: 401, error: 'Usuário não identificado!'})
        }

    } catch (error) {
        console.log(error)
        return res.json(404)
    }
}

module.exports = GetFinancas;