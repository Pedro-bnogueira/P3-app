const Users = require('../../models/Users')
const Notes = require('../../models/Notes')

async function DeleteNote(req, res){
    try {
        const user = await Users.findOne({where: {email: req.body.email}});

        if(user) {
            const note = await Notes.findOne({where: {idnote: req.body.idnote}})

            if(note) {
                await Notes.destroy({where: {idnote: req.body.idnote}})
                return res.json({status: 200})
            }
            else {
                return res.json({status: 400, error: 'Nota não encontrada!'})
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

module.exports = DeleteNote;