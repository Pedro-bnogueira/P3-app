import './LoginSignup.css';
import React, { useRef, useState, useEffect } from 'react';
import { useSignup } from '../../hooks/useSignup';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';


export default function LoginSignup() {
    const {signup, isLoadingSignup, errorSignup} = useSignup();
    const [usernameSignup, setUsernameSignup] = useState('');
    const [emailSignup, setEmailSignup] = useState('');
    const [passwordSignup, setPasswordSignup] = useState('');
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const signupRef = useRef(null);
    const loginRef = useRef(null);
    const [blockedTime, setBlockedTime] = useState(0);
    const [isDisabled, setIsDisabled] = useState(false);
    const { dispatch } = useAuthContext();
    const { user } = useAuthContext();

    // * Funções para o relógio
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
        
    function Relogio(props) {
        const dataExp = new Date(localStorage.getItem('tempo'))
        const dataAtual = new Date()

        if(props.blockedTime == 0){
            if(dataExp > dataAtual){
            let conta = Math.ceil((dataExp - dataAtual) / 1000);
            setBlockedTime(conta)
            setIsDisabled(true)
            } else {
            setIsDisabled(false)  
            }
        }

        if(props.blockedTime > 0){
            //setBlockedTime(localStorage.getItem("tempo"))
            return (
            <>
            <div id="relogio" className='row'>
                <div className='clock-app'></div>
            </div>
            <div className='time-app'><a style={{marginTop: -50}}>{formatTime(props.blockedTime)}</a></div>
            </>
            );
        }
    }

    useEffect(() => {
    let interval = null;
    if (blockedTime > 0) {
        interval = setInterval(() => {
        setBlockedTime((prevTime) => prevTime - 1);
        }, 1000);
    }
    return () => clearInterval(interval);
    }, [blockedTime]); 

    function validacao(caso1, caso2, caso3){
        const email = document.querySelector('#email-login')
        const senha = document.querySelector('#senha-login')
        let valorEmail = email.value
        let valorSenha = senha.value
        const emailLabel = document.querySelector('#tag-email-login')
        const senhaLabel = document.querySelector('#tag-senha-login')

        email.classList.add('invalid-border-app')
        senha.classList.add('invalid-border-app')
        if (caso1 != null){
            emailLabel.textContent = "Digite o email"
            email.classList.add('blank-app')

        } else if (caso3){
            emailLabel.textContent = "Dados incorretos"
            email.classList.add('invalid-app')  
        }
        if(caso2 != null){
            senhaLabel.textContent = "Digite a senha"
            senha.classList.add('blank-app')   
            
        } else if (caso3){
            senhaLabel.textContent = "Dados incorretos"
            senha.classList.add('invalid-app') 
        } 
        
        

        email.addEventListener("click", ()=>{
            email.classList.remove('invalid-app')
            email.classList.remove('blank-app')
            email.classList.remove('invalid-border-app')
            email.classList.remove('muitas-tentativas-app')
            emailLabel.textContent = "Email"
        })
        senha.addEventListener("click", ()=>{
            senha.classList.remove('invalid-app')
            senha.classList.remove('blank-app')
            senha.classList.remove('invalid-border-app')
            senha.classList.remove('aguarde-app')
            senhaLabel.textContent = "Senha"
        })  
    }

    function muitasTentativas(){
        const email = document.querySelector('#email-login')
        const senha = document.querySelector('#senha-login')
        const emailLabel = document.querySelector('#tag-email-login')
        const senhaLabel = document.querySelector('#tag-senha-login')
        
        emailLabel.textContent = "Muitas tentativas inválidas"
        senhaLabel.textContent = "Aguarde 5 minutos"

        email.classList.add('muitas-tentativas-app');
        senha.classList.add('aguarde-app');
        
    }

    function removeInvalidBorder(){
        const email = document.querySelector('#email-login')
        const senha = document.querySelector('#senha-login')
        email.classList.remove('invalid-border-app')
        senha.classList.remove('invalid-border-app')

        // remove a classe de muitas tentativas e aguarde-app para evitar bugs
        email.classList.remove('muitas-tentativas-app')
        senha.classList.remove('aguarde-app')
        
    }

    async function handleSubmit(e) {
        e.preventDefault()
        console.log('username ' + usernameSignup)
        console.log('email ' + emailSignup)
        console.log('password ' + passwordSignup)
        await signup(usernameSignup, emailSignup, passwordSignup)
    }

    async function handleLogin(){
        let msg = "entra funcao"
        try {
            msg = 'entra requisicao'
            const email = document.querySelector('#email-login').value;
            const senha = document.querySelector('#senha-login').value;

            await axios.post('http://localhost:5000/api/login', {email, senha}, {withCredentials: true}).then((response)=>{
                if(response.data.status === 200){
                    console.log(response.data.token)
                    // atualiza o auth context
                    document.cookie = `P3=${response.data.token}; expires=Thu, 31 Dec 2024 23:59:59 GMT; path=/`;
                    localStorage.setItem('user', response.data.email);
                    dispatch({type: 'LOGIN', payload: response.data.email});
                    window.location.href = "http://localhost:3000/";
                } else if(response.data.status === 400) {
                    if(response.data.msg1 ||  response.data.msg2 || response.data.msg == "invalido"){
                        setTimeout(()=>{
                            validacao(response.data.msg1, response.data.msg2, response.data.msg);
                        }, 50) //Pequeno delay de criação apenas para deixar mais intuitivo
                        
                    } else if (response.data.msg === "muitas tentativas") {
                        muitasTentativas();
                        // alert("Muitas tentativas inválidas! Tente novamente em 1 minuto.");
                        setBlockedTime(response.data.time);
                        console.log("tempo" + response.data.time);
                        localStorage.setItem("tempo", response.data.date)
                        setIsDisabled(true);
                    }
                }
            })
        } catch(error) {
            console.error(error);
            window.location.href = "http://localhost:3000/bad/request";
        }
    }

    function switchToSignup () {
        const login = loginRef.current;
        const signup = signupRef.current;
        if (login && signup) {
            login.style.animationName = "toRightSignup"
            login.style.animationDuration = "1s";
            setTimeout(() => {
                login.style.zIndex = "1";
                signup.style.zIndex = "2";
                login.style.animationName = "toPositionSignup";
                login.style.animationDuration = "1s";
            }, 1000 );
        }
    };

    function switchToLogin () {
        const login = loginRef.current;
        const signup = signupRef.current;
        if (login && signup) {
            signup.style.animationName = "toRightLogin"
            signup.style.animationDuration = "1s";
            setTimeout(() => {
                signup.style.zIndex = "1";
                login.style.zIndex = "2";
                signup.style.animationName = "toPosition";
                signup.style.animationDuration = "1s";
            }, 900);
        }
    };

    return(
        <>
        <div className='loginSignup-container'>
            <div className="card-loginSignup login" id="login" ref={loginRef}>
                <h2><i className="fas fa-key"></i> Login</h2>
                <Relogio blockedTime={blockedTime} classList='clock-app'/>
                <div action="" className='form-loginSignup'>
                    <div className="form-group-loginSignup">
                        <label htmlFor="email" id='tag-email-login'>Email:</label>
                        <input 
                            id='email-login'
                            name="email" 
                            type='email' 
                            className='loginSignup-input'
                            onChange={(e) => setEmailLogin(e.target.value)}
                            disabled={isDisabled}
                        />
                    </div>
                    <div className="form-group-loginSignup">
                        <label htmlFor="senha" id='tag-senha-login'>Senha:</label>
                        <input 
                            id='senha-login'
                            name="senha" 
                            type='password' 
                            className='loginSignup-input'
                            onChange={(e) => setPasswordLogin(e.target.value)}
                            disabled={isDisabled}
                        />
                    </div>
                    <button type='submit' className='btn-loginSignup' onClick={()=>{handleLogin(); removeInvalidBorder()}} disabled={isDisabled}>Entrar</button>
                </div>
                <p className='link-login'>
                    Não tem conta ainda? 
                    <span className='switchText' onClick={switchToSignup}>Cadastre-se!</span>
                </p>
            </div>
            <div className='card-loginSignup signup' id='signup' ref={signupRef}>
                <h2><i className='fas fa-user'></i> Nova conta</h2>
                <form action='' className='form-loginSignup' onSubmit={handleSubmit}>
                    <div className='form-group-loginSignup'>
                        <label htmlFor="username">Username:</label>
                        <input 
                            name='username' 
                            type='text' 
                            className='loginSignup-input'
                            onChange={(e) => setUsernameSignup(e.target.value)}
                        />
                    </div>
                    <div className='form-group-loginSignup'>
                        <label htmlFor="email">Email:</label>
                        <input 
                            name='email' 
                            type='email' 
                            className='loginSignup-input'
                            onChange={(e) => setEmailSignup(e.target.value)}
                        />
                    </div>
                    <div className='form-group-loginSignup'>
                        <label htmlFor="senha">Senha:</label>
                        <input 
                            name='senha' 
                            type='password' 
                            className='loginSignup-input'
                            onChange={(e) => setPasswordSignup(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn-loginSignup' disabled={isLoadingSignup}>Criar</button>
                    {errorSignup && <div className='error'>{errorSignup}</div>}
                </form>
                <p className='link-signUp'>
                    Já tem uma conta?
                    <span className='switchText' onClick={switchToLogin}>Entre!</span>
                </p>
            </div>
        </div>
        </>
    );

}