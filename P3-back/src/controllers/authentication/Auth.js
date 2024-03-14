// const jwt = require('jsonwebtoken');
// const fs = require('fs');
// const User = require('../../model/users.model');

// class Auth {
    
//     constructor(){
//     }

//     async authenticate(req, res){
//         try {
//             if(req.cookies.Token){
//                 const token = req.cookies.Token;
//                 const secret = fs.readFileSync('src/private.key');
//                 const decode = jwt.verify(token, secret);
//                 if(decode){
//                     const {id} = decode;
//                     const user = await User.findOne({where: {id: id}})
//                     if(user){
//                         return res.json({status: 200, user});
//                     }
//                 }
//             }
//         } catch (error) {
//             return res.json({status: 404})
//         }
//     }
// }

// module.exports = new Auth();
