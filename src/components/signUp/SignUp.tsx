import { getAuth,createUserWithEmailAndPassword} from 'firebase/auth'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/tsHook';
import { setUser } from '../../store/slices/userSlice';
import Form from '../form/Form';

const SignUp:React.FC = () => {


    const dispatch = useAppDispatch()

    const navigate = useNavigate();

    const[alreadyInUse, setAlreadyInUse] = useState(false);

    const handleRegister = (email:string,password:string) => {
        const auth = getAuth();
        setAlreadyInUse(false);
        createUserWithEmailAndPassword(auth,email,password)
            .then(({user}) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid
                }))
                navigate('/')
            })
            .catch(() => setAlreadyInUse(true))
    }

    return(
        <Form title='Register' handleClick={handleRegister} alreadyInUse={alreadyInUse}/>
    )
}

export default SignUp;