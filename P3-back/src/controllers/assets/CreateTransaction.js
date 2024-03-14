const Users = require('../../models/Users')
const Financas = require('../../models/Financas')
const Transacoes = require('../../models/Transacoes')

async function CreateTransaction(req, res){
    try {
        const user = await Users.findOne({where: {email: req.body.email}});
        
        if(user) {
            const finances = await Financas.findOne({where: {idusuario: user.idusuarios}})
            
            await Transacoes.create({
                idtransacao: req.body.idtransacao,
                idfinancas: finances.idfinancas,
                idusuario: user.idusuarios,
                tipo: req.body.tipo,
                valor: req.body.valor,
                data: req.body.data
            })

            return res.json({status: 200})
            
        }
        else {
            return res.json({status: 401, error: 'Usuário não identificado!'})
        }

    } catch (error) {
        console.log(error)
        return res.json(404)
    }
}

module.exports = CreateTransaction;