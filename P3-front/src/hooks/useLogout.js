import { postAxios } from "./useAxios"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    
    const logout = () => {
        // remover o usuario do cookie
        async function clearCookie() {
            postAxios('http://localhost:5000/api/logout', null, null, {withCredentials: true})
            .then((resp)=>{
                console.log('entra no then')
                window.location.href = "http://localhost:3000/login";
            })
            .catch((error) => {
                console.error('Erro na solicitação', error);
            })
        }
        clearCookie();
        
        localStorage.removeItem('user');

        // dispatch logout
        dispatch({type: 'LOGOUT'});
    }

    return { logout }
}