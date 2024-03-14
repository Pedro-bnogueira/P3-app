import React, { useState, useEffect } from 'react';
import Card from "../../components/Card";
import AppHeader from "../../components/Header";
import AppMenu from "../../components/Menu";
import AppFooter from "../../components/Footer";
import AppSetting from "../../components/Settings";
import { useAuthContext } from "../../hooks/useAuthContext";
import Spinner from "../../components/Spinner";

function Home() {
    const { user, loading } = useAuthContext();
    const [authReady, setAuthReady] = useState(false);

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

    return (
        <>
        <AppHeader />
        <AppMenu />
        <div className="content-wrapper" style={{ minHeight: 675 }}>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2 center-element">
                        <div className="col-12"  >
                            <h3 className="title">Home</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="background-dashboard">
                <section className="articles">
                    <Card
                        href="/notas"
                        image="/dist/img/post-it.jpeg"
                        title="Notas"
                        description="Faça pequenas anotações, que podem ser divididas em páginas, para se organizar em diferentes áreas da sua vida."
                    />
                    <Card
                        href="/financas"
                        image="/dist/img/piggybank.jpeg"
                        title="Finanças"
                        description="Adicione suas movimentações financeiras para visualizar as suas finanças com uso das ferramentas e do gráfico, além de conseguir realizar o seu controle financeiro."
                    />
                    <Card
                        href="/timer"
                        image="/dist/img/timer.jpeg"
                        title="Timer"
                        description="Realize sessões dentro do método pomodoro para aumentar a sua produtividade, podendo controlar o tempo e a quantidade de sessões dentro dessa técnica."
                    />
                </section>
            </div>
        </div>
        <AppFooter />
        <AppSetting />
        </>
    );
}

export default Home;
