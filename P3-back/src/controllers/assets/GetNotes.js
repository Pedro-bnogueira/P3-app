const Users = require('../../models/Users')
const Notes = require('../../models/Notes')
const NotePages = require('../../models/NotePages')

async function GetNotes(req, res){
    try {
        const user = await Users.findOne({where: {email: req.body.email}});

        if(user) {
            const page = await NotePages.findOne({where: {idnote_pages: req.body.idpage}})

            const notes = await Notes.findAll({
                where: {idusuario: user.idusuarios, idpage: req.body.idpage},
                attributes: ['idnote', 'texto', 'data'], // Selecionando os atributos desejados
                raw: true // Obtendo resultados brutos
            });
            
            const resultado = notes.map(note => {
                // Converter a string de data para um objeto Date
                const dataObjeto = new Date(note.data);
            
                // Formatar a data no formato brasileiro (DD/MM/YYYY)
                const dataFormatada = `${dataObjeto.getDate()}/${dataObjeto.getMonth() + 1}/${dataObjeto.getFullYear()}`;
            
                return {
                    id: note.idnote,
                    text: note.texto,
                    date: dataFormatada
                };
            });
            
            console.log(resultado)

            if(notes){
                return res.json({status: 200, notes: resultado, page: page.nome})
            }
            else {
                return res.json({status: 400, error: 'Não há notas', notes: null})
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

module.exports = GetNotes;