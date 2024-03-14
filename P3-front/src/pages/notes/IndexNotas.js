import { useState, useEffect } from 'react';
import AppHeader from '../../components/Header';
import AppMenu from '../../components/Menu';
import AppFooter from '../../components/Footer';
import AppSetting from '../../components/Settings';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import Spinner from '../../components/Spinner';
import { postAxios } from '../../hooks/useAxios';
import { nanoid } from 'nanoid';

export default function IndexNotas() {
    const [notePages, setNotePages] = useState([]);
    const [newPage, setNewPage] = useState('');
    const { user, loading } = useAuthContext();
    const [authReady, setAuthReady] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        setAuthReady(!loading);
    }, [loading]);

    useEffect(() => {
        if(authReady){
            async function getPages() {
                const email = user;
                await postAxios('http://localhost:5000/api/get-pages', {email}, null, {withCredentials: true})
                .then((resp) => {
                    if(resp.data.status === 200) {
                        setNotePages(resp.data.pages)
                    }
                    else if(resp.data.status === 401){
                        alert(resp.data.error)
                        window.location.href('http://localhost:3000/login')
                    }
                })
                .catch((error) => {
                    window.location.href = "http://localhost:3000/bad/request";
                    console.error('Erro na solicitação', error);
                })
            }
            getPages();
        }
        
    },[authReady])

    if (!authReady) {
        // Mostra um spinner ou uma mensagem de carregamento enquanto o contexto está carregando.
        return <Spinner />;
    }

    if (!user) {
        // Se o usuário ainda não estiver autenticado, redirecione para a página de login.
        window.location.href = "http://localhost:3000/login";   
        return null; // Evita que o restante do componente seja renderizado.
    }

    const handleChangeNewPage = (event) => {
        setNewPage(event.target.value);
    };

    const handleAddPage = () => {
        if (isProcessing) return; // Impede cliques adicionais enquanto já está em andamento
        
        setError(null);
        setIsProcessing(true);

        const email = user;
        const idnote_pages = nanoid()
        const nome = newPage;

        postAxios('http://localhost:5000/api/create-page', {idnote_pages, email, nome}, null, {withCredentials: true})
        .then((resp) => {
            if (resp.data.status === 200) {
                const newPage = resp.data.page
                console.log(newPage)
                setNotePages([...notePages, newPage]);
            }
            if (resp.data.status === 400) {
                setError(resp.data.error)
            }
        })
        .catch((error) => {
            window.location.href = "http://localhost:3000/bad/request";
            console.error('Erro na solicitação', error);
        })
        .finally(() => {
            setIsProcessing(false); // Habilita o botão novamente após a conclusão ou erro
        })

        if (notePages.some(page => page.name === newPage)) {
            return;
        }

        setNewPage('');
    };

    console.log(notePages)
    return(
        <>
            <AppHeader/>
            <AppMenu/>
            <div className="content-wrapper" style={{height: 675}}>
                <div className="content">
                    <div className="container-fluid">
                        <div className="row mb-2 center-element">
                            <div className="col-12" style={{marginTop: "15px"}}>
                                <h1 className="title">
                                    NOTAS
                                </h1>
                                <div className="page-container">
                                    <div className="pages-list">
                                        {notePages && notePages.map((page) => (
                                            <div key={page.id} style={{marginTop: '20px'}}>
                                                <Link to={`/notas/${page.id}`} className='page'><h5>{page.name}</h5></Link>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='add-page' style={{marginTop: '10px'}}>
                                        <TextField
                                            variant="standard"
                                            value={newPage}
                                            onChange={handleChangeNewPage}
                                            InputProps={{
                                                style: {
                                                    textAlign: 'center', // Centraliza o texto
                                                    display: 'block', // Força o elemento a ser um bloco
                                                    color: "#808080"
                                                }
                                            }}
                                        />
                                        <button onClick={handleAddPage} className="btn btn-submit" style={{marginLeft: 30}} disabled={isProcessing}>Adicionar página</button>
                                        {error && <div className='error' style={{width: '360px'}}>{error}</div>}
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
