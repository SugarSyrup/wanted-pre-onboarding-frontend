import { useState, useEffect } from "react";
import { UserForm } from "../components/styles/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('accesstoken')) {
            navigate('/todo')
        }
    }, [])

    const onSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData);

        if(!data.email.includes('@')){
            setError('이메일은 반드시 @를 포함해야 합니다.')
        } else if(data.password.length < 8) {
            setError('비밀번호는 반드시 8자리를 넘어야 합니다.')
        } else {
            axios.post('https://www.pre-onboarding-selection-task.shop/auth/signin', {
                email:data.email,
                password:data.password
            })
                .then((response) => {
                    localStorage.setItem('access_token', response.data.access_token);
                    navigate('/todo');
                });
        }
    }

    return(
        <UserForm onSubmit={onSubmit}>
            <label>email</label>
            <input data-testid="email-input" type="text" name="email"/>
            <label>password</label>
            <input data-testid="password-input" type="password" name="password"/>
            {error !== '' && <span>{error}</span>}
            <button data-testid="signin-button">로그인</button>
        </UserForm>
    )
}

export default Login;