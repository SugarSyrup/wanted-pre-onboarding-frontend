import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserForm } from "../components/styles/Form";
import axios from "axios";

function Signup() {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isOk, setIsok] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('accesstoken')) {
            navigate('/todo')
        }
    }, [])

    const onEmailChange = (e) => {
        setEmail(e.currentTarget.value);
        onValid();
    }
    const onPasswordChange = (e) => {
        setPassword(e.currentTarget.value);
        onValid();
    }
    const onValid = () => {
        if(!email.includes('@')){
            setError('이메일은 반드시 @를 포함해야 합니다.');
            setIsok(true);
        } else if(password.length < 8) {
            setError('비밀번호는 반드시 8자리를 넘어야 합니다.');
            setIsok(true);
        } else {
            setIsok(false);
        }
    }

    const onSubmit = (e) => {
		e.preventDefault();

        axios.post('https://www.pre-onboarding-selection-task.shop/auth/signup', {
                email:email,
                password:password
            })
            .then((response) => {
                navigate('/signin');
            });
        
    }

    return(
        <UserForm onSubmit={onSubmit}>
            <label>email</label>
            <input data-testid="email-input" type="text" name="email" value={email} onChange={onEmailChange}/>
            <label>password</label>
            <input data-testid="password-input" type="password" name="password" value={password} onChange={onPasswordChange}/>
            {error !== '' && <span>{error}</span>}
            <button data-testid="signup-button" disabled={isOk}>회원가입</button>
        </UserForm>
    )
}

export default Signup;