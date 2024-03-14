const Users = require('../../models/Users')
const Notes = require('../../models/Notes')

async function CreateNote(req, res){
    try {
        const user = await Users.findOne({where: {email: req.body.email}});

        if(user) {
            await Notes.create({
                idnote: req.body.idnote,
                idusuario: user.idusuarios,
                idpage: req.body.idpage,
                texto: req.body.texto,
                data: req.body.data
            })

            const dataObjeto = new Date(req.body.data);
            
            // Formatar a data no formato brasileiro (DD/MM/YYYY)
            const dataFormatada = `${dataObjeto.getDate()}/${dataObjeto.getMonth() + 1}/${dataObjeto.getFullYear()}`;

            const note = {id: req.body.idnote, text: req.body.texto, date: dataFormatada}

            return res.json({status: 200, note: note})
        }
        else {
            return res.json({status: 401, error: 'Usuário não identificado!'})
        }

    } catch (error) {
        console.log(error)
        return res.json(404)
    }
}

module.exports = CreateNote;