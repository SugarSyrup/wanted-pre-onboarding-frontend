import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserForm } from "../components/styles/Form";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isOk, setIsok] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('access_token')) {
            navigate('/todo')
        }
    }, [navigate])

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
        <div style={{margin:'auto', display:'flex', flexDirection:'column'}}>
            <UserForm onSubmit={onSubmit}>
                <h1 style={{marginTop:'-20px'}}>Sign up</h1>
                <label>email</label>
                <input data-testid="email-input" type="text" name="email" value={email} onChange={onEmailChange}/>
                <label>password</label>
                <input data-testid="password-input" type="password" name="password" value={password} onChange={onPasswordChange}/>
                {error !== '' && <span>{error}</span>}
                <button data-testid="signup-button" disabled={isOk}>회원가입</button>
            </UserForm>
            <Link to="/signin" style={{width:'100%', height:'80px', backgroundColor:'aliceblue', display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'10px', color:'black', fontSize:'24px', fontWeight:'bolder',textDecoration:'none', cursor:'pointer', marginTop:'20px'}}>
                Sign In &rarr;
            </Link>
        </div>
    )
}

export default Signup;