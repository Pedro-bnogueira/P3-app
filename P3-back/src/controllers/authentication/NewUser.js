const Users = require('../../models/Users')
const Financas = require('../../models/Financas')
const validation = require('../../validations/validationNewUser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function NewUser(req, res){
    console.log('entra no signup')
    console.log(req.body)
    try {
        const erros = validation(req)
        console.log(erros)
        if(erros.length == 0){

            const userEmail = await Users.findOne({where: {email: req.body.email}});

            if(userEmail){
                const erros = {mensagem: 'Já existe um usuário com esse email!'}
                return res.json({status: 400, erros})
            }

            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(req.body.senha, salt);

            await Users.create({
                username: req.body.username,
                email: req.body.email, 
                senha: password, 
            })

            const user = await Users.findOne({where: {email: req.body.email}})

            await Financas.create({
                idusuario: user.idusuarios
            })

            let token = jwt.sign({user: req.body.username, email: req.body.email}, 'secret');
            res.cookie('P3', token);

            return res.json({
                status: 200,
                erros,
                email: user.email
            });

        } else {
            console.log(erros)
            return res.json({status: 400, erros})
        }

    } catch (error) {
        console.log(error)
        return res.json(404)
    }
}

module.exports = NewUser;