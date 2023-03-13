import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Form.scss'

interface FormProps {
    title:string;
    handleClick: (email:string,password:string) => void;
    notFound?:boolean;
    alreadyInUse?:boolean;
}

const Form:React.FC<FormProps> = ({title,handleClick,notFound,alreadyInUse}) => {

    const navigate = useNavigate();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [emailValidateError,setEmailValidateError] = useState('');
    const [passwordValidateError,setPasswordValidateError] = useState('');

    const btnHandle = () => {
        let error = false;
        if (!email.endsWith('@gmail.com')) {
            setEmailValidateError('Wrong entry email');
            error = true;
        }else{
            setEmailValidateError('');
        }
        if (password.length < 6) {
            setPasswordValidateError('Password must contain at least 6 characters');
            error = true;
        }else{
            setPasswordValidateError('');
        }
        if (!error) {
            handleClick(email,password);
        }
    }

    useEffect(() => {
        setEmail('');
        setPassword('');
    },[notFound])

  

    return(
        <div className="form">
            <input 
                className="form__input"
                type='email' 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            <input 
                className="form__input"
                type='password'
                placeholder="Pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            {emailValidateError ? <p className="form__input-error">{emailValidateError}</p> : null}
            {passwordValidateError ? <p className="form__input-error">{passwordValidateError}</p> : null}
            {notFound ? <p className="form__input-error">User not Found</p> : null}
            {alreadyInUse ? <p className="form__input-error">Email already in use</p> : null}
            <button className="form__button button" onClick={btnHandle}>{title}</button>
            {title === 'Log in' ? <button onClick={() => navigate('/signUp')} className="form__button button">Create</button> : null}
        </div>
    )
}

export default Form;