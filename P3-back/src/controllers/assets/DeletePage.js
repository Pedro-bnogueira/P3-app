const Users = require('../../models/Users')
const NotePages = require('../../models/NotePages')

async function DeletePage(req, res){
    try {
        const user = await Users.findOne({where: {email: req.body.email}});

        if(user) {
            console.log(req.body.id)
            const page = await NotePages.findOne({where: {idnote_pages: req.body.id}})

            if(page) {
                await NotePages.destroy({where: {idnote_pages: req.body.id}})
                return res.json({status: 200})
            }
            else {
                return res.json({status: 400, error: 'Página não encontrada!'})
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

module.exports = DeletePage ;