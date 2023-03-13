import Form from "../form/Form";
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'
import { useAppDispatch } from "../../hooks/tsHook";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/slices/userSlice";
import { useState } from "react";

const Login:React.FC = () => {

    const [notFound,setNotFound] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const handleLogin = (email:string,password:string) => {
        setNotFound(false);
        const auth = getAuth();
        signInWithEmailAndPassword(auth,email,password)
            .then(({user}) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid
                }))
                navigate('/')
            })
            .catch(() => setNotFound(true));
    }

    return (
        <Form title="Log in" handleClick={handleLogin} notFound={notFound}/>
    )
}

export default Login;