const Users = require('../../models/Users')
const NotePages = require('../../models/NotePages')

async function GetNotePages(req, res){
    try {
        const user = await Users.findOne({where: {email: req.body.email}});

        if(user) {
            const pages = await NotePages.findAll({
                where: {idusuario: user.idusuarios},
                attributes: ['idnote_pages', 'nome'], // Selecionando os atributos desejados
                raw: true // Obtendo resultados brutos
            });
            
            const resultado = pages.map(page => ({
                id: page.idnote_pages,
                name: page.nome
            }));

            if(pages){
                return res.json({status: 200, pages: resultado})
            }
            else {
                return res.json({status: 400, error: 'Não há páginas', pages: null})
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

module.exports = GetNotePages;