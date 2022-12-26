import { onAuthStateChanged } from 'firebase/auth';
import {createContext, useEffect, useReducer} from 'react';
import { appAuth } from '../firebase/config';

//context 객체를 생성합니다. 
const AuthContext = createContext();

const authReducer = (state, action) => {
    switch(action.type) {
        case 'login':
            return {...state, user: action.payload }
        case 'loginout':
            return {...state, user: null }
        case 'isAuthReady':
            return {...state, user: action.payload , isAuthReady: true }
        default:
            return state
    }
}




//context를 구독할 컴포넌트의 묶음 범위를 설정합니다. 
const AuthContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isAuthReady: false
    })

    useEffect(() => { 
        const unsubscribe = onAuthStateChanged(appAuth, (user) => {
            dispatch({type: 'isAuthReady', payload: user });
        });
        return unsubscribe;
    }, [])
    

    console.log('user state : ', state);
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthContextProvider }