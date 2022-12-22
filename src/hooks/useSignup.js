import {useState} from "react"
import {appAuth} from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile} from "firebase/auth";

export const useSignup = () => {
    //에러 정보를 저장합니다.
    const [error, setError] = useState(null);
    // 현재 서버와 통신 상태를 저장합니다.
    const [isPending, setIsPending] = useState(false);

    const signup = ( email, password, displayName ) => {
        setError(null); //아직 에러가 없습니다.
        setIsPending(true); // 통신을 진행중입니다.

        createUserWithEmailAndPassword(appAuth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);

                if(!user){
                    throw new Error('회원가입에 실패했습니다.');
                }

                updateProfile(appAuth.currentUser, {displayName})
                    .then(() => {
                        setError(null);
                        setIsPending(false);
                    }).catch((err) => {
                        setError(err.message);
                        setIsPending(false);
                    })

            }).catch((err) => {
                  setError(err.message);
                  setIsPending(false);  
            })
    }
    return{error,isPending,signup}
}