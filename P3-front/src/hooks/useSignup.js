import { useState } from "react";
import { useAuthContext } from './useAuthContext';
import { Password } from "@mui/icons-material";
import { postAxios } from "./useAxios";
import axios from "axios";

export const useSignup = () => {
    const [errorSignup, setErrorSignup] = useState(null)
    const [isLoadingSignup, setIsLoadingSignup] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (username, email, senha) => {
        
        setIsLoadingSignup(true)
        setErrorSignup(null)


        const response = await postAxios('http://localhost:5000/api/signup', {username, email, senha}, null, {withCredentials: true});
        console.log(response.data);

        if (response.data.status === 200) {
            // salva o user para o cookie
            document.cookie = `P3=${response.data.token}; expires=Thu, 31 Dec 2024 23:59:59 GMT; path=/`;
            window.location.href = "http://localhost:3000/";

            localStorage.setItem('user', response.data.email);

            // atualiza o auth context
            dispatch({type: 'LOGIN', payload: response.data.email});
            
            setIsLoadingSignup(false);
        }

        if (response.data.status === 400) {
            setIsLoadingSignup(false);
            setErrorSignup(response.data.erros.mensagem);
            console.log(errorSignup);
        }
       
    }

    return { signup, isLoadingSignup, errorSignup }
}
