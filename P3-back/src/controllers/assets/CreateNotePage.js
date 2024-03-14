const Users = require('../../models/Users')
const NotePages = require('../../models/NotePages')

async function CreateNotePage(req, res){
    try {
        const user = await Users.findOne({where: {email: req.body.email}});
        const existNotePage = await NotePages.findOne({where: {nome: req.body.nome}})

        if(user) {
            if(!existNotePage){
                await NotePages.create({
                    idnote_pages: req.body.idnote_pages,
                    idusuario: user.idusuarios,
                    nome: req.body.nome
                })

                const page = {id: req.body.idnote_pages, name: req.body.nome}

                return res.json({status: 200, page: page})
            }
            else {
                return res.json({status: 400, error: 'Já existe uma página com esse nome!'})
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

module.exports = CreateNotePage;