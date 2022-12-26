import { addDoc, collection } from "firebase/firestore";
import { appFireStore } from "../firebase/config";
import { useReducer } from "react"


const initState = {
    document: null,
    isPending: false,
    error: null,
    success: false
}

const storeReducer = (state, action) => {
    switch(action.type) {
        default:
            return state
    }
}

export const useFirestore = (transaction) => {

    const [response, dispatch] = useReducer(storeReducer, initState);

    //colRef: 컬렉션의 참조를 요구합니다.
    const colRef = collection(appFireStore, transaction); 

    //컬렉션에 문서를 추가합니다.
    const addDocument = async (doc) => { 
        dispatch({type: "isPending"})

        try{
            const docRef = await addDoc(colRef, doc);
            dispatch({type: "isPending"})
        }catch(error){

        }

    }

    //컬렉션에서 문서를 제거합니다.
    const deleteDocument = (id) => {

    }

    return {addDocument, deleteDocument, response}
}