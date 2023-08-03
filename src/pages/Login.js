import { useState, useEffect } from "react";
import { UserForm } from "../components/styles/Form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log(localStorage.getItem('access_token'));
        if(localStorage.getItem('access_token')) {
            console.log(localStorage.getItem('access_token'));
            navigate('/todo')
        }
    }, [navigate])

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
        <div style={{margin:'auto', display:'flex', flexDirection:'column'}}>
            <UserForm onSubmit={onSubmit}>
                <h1 style={{marginTop:'-20px'}}>Login</h1>
                <label>email</label>
                <input data-testid="email-input" type="text" name="email"/>
                <label>password</label>
                <input data-testid="password-input" type="password" name="password"/>
                {error !== '' && <span>{error}</span>}
                <button data-testid="signin-button">로그인</button>
            </UserForm>
            
            <Link to="/signup" style={{width:'100%', height:'80px', backgroundColor:'aliceblue', display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'10px', color:'black', fontSize:'24px', fontWeight:'bolder',textDecoration:'none', cursor:'pointer', marginTop:'20px'}}>
                Sign Up &rarr;
            </Link>
        </div>
    )
}

export default Login;