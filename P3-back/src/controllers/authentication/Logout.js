const jwt =  require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const ActiveSessions= require('../../models/ActiveSessions');

async function Logout(req, res){
    try {
        if(req.cookies['P3']){
            //const authVerify =  await jwt.verify(req.body.token, fs.readFileSync(path.join(__dirname, '..', '..', 'private.key')), { algorithms: ['HS256'] });
            const authVerify =  await jwt.verify(req.cookies['P3'], 'secret', { algorithms: ['HS256'] });
            const active = await ActiveSessions.findOne({where: {session: req.cookies.P3}})
	        console.log(authVerify)
            console.log('Logout:>>>>>>>>>>>>')
            if(authVerify){
		        console.log('logout authVerify')
                if(active != null){
                    await active.destroy()
                }
                res.clearCookie('P3', {domain: 'localhost', secure: false, httpOnly: true})
                // res.redirect('http://localhost:3000/login')
                res.json(200);
            }
        }
        else{
            res.json('sem cookie!')
        }
    } catch (error) {
        console.log(error)
        return res.json(404)
    }
}


module.exports = Logout;