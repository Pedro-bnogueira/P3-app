import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { postAxios } from "./useAxios";

export default function useAuth() {
    const history = useHistory();
    const [authenticated, setAuthenticated] = useState(null)

    useEffect(() => {
        const auth = async () => {
            postAxios('http://localhost:5000/api/auth', null, null, {withCredentials: true})
            .then((resp) => {
                setAuthenticated(true);
                console.log("Usuário autenticado")
            })
            .catch((error) => {
                alert('Você está deslogado ou sua sessão expirou! Faça login novamente!');
                history.push("/login");
                console.error('Erro na solicitação', error);
            })
        };
        auth();
    },[history]);

    return { authenticated };
}