function validationNewUser(req){
    let error = []
    try{
        // campo username
        if(!req.body.username || req.body.username == '' || req.body.username == null || req.body.username == undefined){
            error.push({mensagem: 'O campo nome não está preenchido', elemento: 'nome'})
        }

         // campo email
         if(!req.body.email || req.body.email == '' || req.body.email == null || req.body.email == undefined){
            error.push({mensagem: 'O campo email não está preenchido', elemento: 'email'})
        }

         // campo senha
         if(!req.body.senha || req.body.senha == '' || req.body.senha == null || req.body.senha == undefined){
            error.push({mensagem: 'O campo senha não está preenchido', elemento: 'senha'})
        }

        return error
    } catch(erro) {
        console.log(erro)
        return 400
    }
    
}

module.exports = validationNewUser