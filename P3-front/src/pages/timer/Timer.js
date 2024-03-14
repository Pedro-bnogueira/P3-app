import React, { useState, useEffect } from 'react';
import AppHeader from '../../components/Header';
import AppMenu from '../../components/Menu';
import AppFooter from '../../components/Footer';
import AppSetting from '../../components/Settings';
import { useAuthContext } from '../../hooks/useAuthContext';
import Spinner from '../../components/Spinner';

function Timer() {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const { user, loading } = useAuthContext();
    const [authReady, setAuthReady] = useState(false);

    useEffect(() => {
        let intervalId;

        if (isActive) {
            intervalId = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(intervalId);
                        // O tempo acabou
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isActive, minutes, seconds]);

    useEffect(() => {
        setAuthReady(!loading);
    }, [loading]);

    if (!authReady) {
        // Mostra um spinner ou uma mensagem de carregamento enquanto o contexto está carregando.
        return <Spinner />;
    }

    if (!user) {
        // Se o usuário ainda não estiver autenticado, redirecione para a página de login.
        window.location.href = "http://localhost:3000/login";   
        return null; // Evita que o restante do componente seja renderizado.
    }

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setMinutes(25);
        setSeconds(0);
    };

    return (
        <>
            <AppHeader/>
            <AppMenu/>
            <div className="content-wrapper" style={{minHeight: 675}}>
                <div className="content">
                    <div className="container-fluid">
                        <div className="row mb-2 center-element">
                            <div className="col-12" style={{marginTop: "15px"}}>
                                <h1 className="title">
                                🍅 POMODORO
                                </h1>
                                <div className="pomodoro-container center-element">
                                    <h1 className="timer">
                                        {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                                    </h1>
                                    <div className="controls">
                                        <button onClick={toggleTimer} className='btn' style={{fontSize: '48px'}}>
                                            {isActive ? <i className='fa fa-pause' ></i> : <i className='fa fa-play'></i>}
                                        </button>
                                        <button onClick={resetTimer} className='btn' style={{fontSize: '48px'}}>
                                            <i className='fa fa-power-off'></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <AppFooter/>
            <AppSetting/>
        </>
    );
}

export default Timer;
