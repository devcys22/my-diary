import {createContext} from 'react';

//context 객체를 생성합니다. 
const AuthContext = createContext();

const authReducer = (state, action) => {
    switch(action.type) {
        case 'login':
            return {...state, user: action.payload }
        default:
            return state
    }
}

//context를 구독할 컴포넌트의 묶음 범위를 설정합니다. 
const AuthContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    console.log('user state : ', state);
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthContextProvider }