const jwt = require('jsonwebtoken');
const { Request, Response } = require('express');
const fs = require('fs');
const User = require('../../models/Users');
const blacklists = require('../../models/Blacklists');
const active_sessions = require('../../models/ActiveSessions');
const bcrypt = require('bcrypt')


async function Login(req, res){
    try {
        const {email, senha} = req.body;

        // * Validação
        let msg1 = null, msg2 = null;
        if (!email || email == '' || email == null || email == undefined) {
            msg1 = "email vazio"
        } else {
            msg1 = null;
        }

        if (!senha || senha == '' || senha == null || senha == undefined) {
            msg2 = "senha vazia"
        } else {
            msg2 = null;
        }

        if(msg1 != null || msg2 != null){
            return res.json({msg1, msg2, status: 400});
        }

        // * Sessão ativa
        const active = await active_sessions.findOne({where: {user: email}});

        if(active != null && active.expiresat < new Date()){
            await active.destroy();
        }

        // * Blacklist
        const [blacklistEntry] = await blacklists.findOrCreate({
            where: {user: email},
            defaults: {attempts: 0, expiresat: new Date(Date.now() + 5 * 60 * 1000)}
        });

        if(blacklistEntry.expiresat < new Date()){
            await blacklistEntry.destroy();
            const [newBlacklistEntry] = await blacklists.findOrCreate({
                where: { user: email },
                defaults: { attempts: 0, expiresat: new Date(Date.now() + 5 * 60 * 1000) }
            }); 

            const user = await User.findOne({where: {email: email}});
            let hash = null
            if(user) {
                hash = await bcrypt.compare(senha, user.senha);
            }

            if(hash){
                let token = jwt.sign({user: user.email}, 'secret');
                res.cookie('P3', token, { httpOnly: true, secure: false });

                if(active != null){
                    if(email == active.user && token != active.session){
                        await active.destroy();
                    }
                }
                await active_sessions.create({user: email, session: token, expiresat: new Date(Date.now() + 30 * 60 * 1000)});
                await newBlacklistEntry.update({attempts: 0}, {where: { user: email }});
                return res.json({msg: "sucesso", status: 200, token: token, email:user.email});   
            } else {
                let cont = newBlacklistEntry.attempts;
                await newBlacklistEntry.update({attempts: cont + 1}, {where: {user: email}});
                if(cont+1 >= 5){
                    const dataExp = (new Date(newBlacklistEntry.expiresat).getMilliseconds());
                    const dataAtual = new Date().getMilliseconds();
                    const time = Math.ceil((dataExp - dataAtual) / 1000);
                    const date = newBlacklistEntry.expiresat
                    return res.json({msg: 'muitas tentativas', time, date, status: 400});
                }

                setTimeout(() => {
                    return res.json({msg: "invalido", status: 400});
                }, 2000);             
            }
        } else {
            if(blacklistEntry.attempts >= 5){
                const dataExp = (new Date(blacklistEntry.expiresat).getMilliseconds());
                const dataAtual = new Date().getMilliseconds();
                const time = Math.ceil((dataExp - dataAtual) / 1000);
                const date = blacklistEntry.expiresat
                return res.json({msg: 'muitas tentativas', time, date, status: 400});
            }

            const user = await User.findOne({where: {email: email}});
            let hash = null
            if(user) {
                hash = await bcrypt.compare(senha, user.senha);
            }

            if(hash){
                let token = jwt.sign({user: user.email}, 'secret');
                res.cookie('P3', token);

                if(active != null){
                    if(email == active.user && token != active.session){
                        await active.destroy();
                    }
                }
                await active_sessions.create({user: email, session: token, expiresat: new Date(Date.now() + 30 * 60 * 1000)});
                await blacklistEntry.update({attempts: 0}, {where: {user: email}});
                return res.json({msg: "sucesso", status: 200, token: token, email: user.email});
            } else {
                let cont = blacklistEntry.attempts;
                await blacklistEntry.update({ attempts: cont + 1 }, { where: { user: email } });
        
                if (cont + 1 >= 5) {
                    const time = Math.ceil((new Date(blacklistEntry.expiresat).getTime() - new Date().getTime()) / 1000);
                    const date = blacklistEntry.expiresat
                    return res.json({msg: 'muitas tentativas', time, date, status: 400});
                }
        
                setTimeout(() => {
                    return res.json({msg: "invalido", status: 400});
                }, 1000); 
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(404).send('Erro');
    }
}

module.exports = Login;
