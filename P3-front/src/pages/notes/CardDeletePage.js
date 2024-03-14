import { postAxios } from '../../hooks/useAxios';
import PropTypes from 'prop-types'

CardDeletePage.prototypes = {
    showCard: PropTypes.bool,
    handleCloseCard: PropTypes.func,
    message: PropTypes.string,
    elementId: PropTypes.number,
};

function CardDeletePage(props) {
    const {user, showCard, handleCloseCard, message, elementId} = props;
    
    // * Funcao para deletar uma pagina
    async function deletePage(id) {
        const email = user;
        postAxios(`http://localhost:5000/api/delete-page`, {email, id}, null, null, {withCredentials: true})
        .then((resp) => {
            if(resp.data.status === 200) {
                window.location.href = 'http://localhost:3000/notas';
            }
            if (resp.data.status === 400) {
                alert(resp.data.error)
            }
            if (resp.data.status === 401) {
                alert(resp.data.error)
                window.location.href = "http://localhost:3000/login";
            }
        })
        .catch((error) => {
            window.location.href = "http://localhost:3000/bad/request";
            console.error('Erro na solicitação POST:', error);
        })
    }

    function handleConfirmDelete() {
        // função de exclusão aqui
        deletePage(elementId);
    
        // fecha o card
        handleCloseCard();
    }

    function createCard() {
        return (
            <div className={` ${showCard ? 'card-delete-overlay visible' : ''}`}>
                <div className={`card-delete ${showCard ? 'visible' : ''}`}>
                    <div class="header-delete">
                        <div class="image-delete">
                            <svg aria-hidden="true" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" fill="none">
                                <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" stroke-linejoin="round" stroke-linecap="round"></path>
                            </svg>
                        </div>
                        <div class="content-delete">
                            <span class="title-delete">Confirmação de exclusão</span>
                            <p class="message-delete">{message}</p>
                        </div>
                        <div class="actions-delete">
                            <div className='row'>
                                <button class="desactivate-delete" onClick={handleConfirmDelete}>Excluir</button>
                            </div>
                            <div className='row'>
                                <button class="cancel-delete" onClick={handleCloseCard}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
        <div className='row'>
            <div class="col-12 text-center">
            {createCard()}
            </div>
        </div>
        </>
    );
}

export default CardDeletePage;