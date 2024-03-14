import { createContext, useReducer, useEffect } from "react";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

const ACTIONS = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    LOADING: 'LOADING'
}

export const authReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return { user: action.payload }
        case ACTIONS.LOGOUT:
            return { user: null }
        case ACTIONS.LOADING:
            return { ...state, loading: action.payload }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null, loading: false })

    useEffect(() => {
        dispatch({ type: 'LOADING', payload: true })

        const user = localStorage.getItem('user')
        if(user) {
            dispatch({ type: 'LOGIN', payload: user })
            dispatch({ type: 'LOADING', payload: false })
        }
        else {
            dispatch({ type: 'LOADING', payload: false })
        }
    },[])

    console.log('AuthContext state: ', state);
 
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}