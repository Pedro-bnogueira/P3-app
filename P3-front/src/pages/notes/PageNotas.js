import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from '../../components/notes-elements/NotesList';
import Search from '../../components/notes-elements/Search';
import AppHeader from '../../components/Header';
import AppMenu from '../../components/Menu';
import AppFooter from '../../components/Footer';
import AppSetting from '../../components/Settings';
import { useParams } from "react-router-dom";
import { useAuthContext } from '../../hooks/useAuthContext';
import Spinner from '../../components/Spinner';
import { postAxios } from '../../hooks/useAxios';
import CardDeletePage from './CardDeletePage';


function Notas(){
    // id da pagina, obtido pela url
    const { id } = useParams();
    const [page, setPage] = useState(null)
    const [notes, setNotes] = useState([]);
    console.log(notes)
    const [searchText, setSearchText] = useState('');
    const { user, loading } = useAuthContext();
    const [authReady, setAuthReady] = useState(false);
    const [showCardDelete, setShowCardDelete] = useState(false);

    useEffect(() => {
        setAuthReady(!loading);
    }, [loading]);

    useEffect(() => {
        if(authReady){
            async function getNotes() {
                const email = user;
                const idpage = id;

                await postAxios('http://localhost:5000/api/get-notes', {email, idpage}, null, {withCredentials: true})
                .then((resp) => {
                    if(resp.data.status === 200) {
                        setNotes(resp.data.notes)
                        setPage(resp.data.page)
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
            getNotes();
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

    // * Funcoes para criacao do card de confirmacao de exclusao
    
    const handleCloseCardDelete = () => {
        setShowCardDelete(false);
    };
    
      const handleShowMCardDelete = () => {
        setShowCardDelete(true);
    };

    const addNote = (text) => {
        const data = new Date();
        const email = user;
        const idnote = nanoid();
        const idpage = id;
        const texto = text;

        postAxios('http://localhost:5000/api/create-note', {idnote, email, idpage, texto, data}, null, {withCredentials: true})
        .then((resp) => {
            if(resp.data.status === 200){
                const novaNota = resp.data.note;
                setNotes([...notes, novaNota]);
            }
            if (resp.data.status === 401) {
                alert(resp.data.error)
                window.location.href = "http://localhost:3000/login";
            }
        })
        .catch((error) => {
            window.location.href = "http://localhost:3000/bad/request";
            console.error('Erro na solicitação', error);
        })
    };
    console.log(notes)

    const deleteNote = (idNote) => {
        console.log('id' + idNote)
        const email = user;
        const idnote = idNote;

        postAxios('http://localhost:5000/api/delete-note', {email, idnote}, null, {withCredentials: true})
        .then((resp) => {
            if (resp.data.status === 400) {
                alert(resp.data.error)
            }
            if (resp.data.status === 401){
                alert(resp.data.error)
                window.location.href('http://localhost:3000/login')
            }
        })
        .catch((error) => {
            window.location.href = "http://localhost:3000/bad/request";
            console.error('Erro na solicitação', error);
        })

        const newNotes = notes.filter((note) => note.id !== idNote);
        setNotes(newNotes);
    };

    return (
        <>
        <AppHeader/>
        <AppMenu/>
        <div class="content-wrapper" style={{height: 675}}>
            <div className='container-notas'>
                <div className='header-notas'>
                    <h1>{page}</h1>
                    <button className='btn btn-delete' onClick={handleShowMCardDelete}><i className='fa fa-trash'></i></button>
                </div>
                <Search handleSearchNote={setSearchText}/>
                <div className="notes-list-container">
                    {
                        notes && <NotesList
                        notes={notes.filter((note) =>
                            note.text.toLowerCase().includes(searchText)
                        )}
                        handleAddNote={addNote}
                        handleDeleteNote={deleteNote}
                    />
                    }
                    
                </div>
                <CardDeletePage
                    user={user}
                    showCard={showCardDelete}
                    handleCloseCard={handleCloseCardDelete}
                    message={'Essa ação irá excluir essa página e todas as suas notas. Tem certeza de que deseja fazer isso?'}
                    elementId={id}
                />
            </div>      
        </div>
        <AppFooter/>
        <AppSetting/>
        </>
    );
}

export default Notas;
