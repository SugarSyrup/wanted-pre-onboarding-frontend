import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TodoObj from "../components/TodoObj";

function Todo() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewtodo] = useState('');
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if(!access_token) {
            navigate('/signin')
        }
        else {
            axios.get('https://www.pre-onboarding-selection-task.shop/todos', {
                headers: {Authorization : `Bearer ${access_token}`}
            })
                .then((response) => {
                    setTodos(response.data);
                })
        }
    }, [navigate, refresh])

    const onSubmit = (e) => {
        e.preventDefault();
        const access_token = localStorage.getItem('access_token');
        setNewtodo('');

        axios.post('https://www.pre-onboarding-selection-task.shop/todos', {
            todo: newTodo
        },{
            headers: {Authorization : `Bearer ${access_token}`}
        })
            .then((response) => {
                setRefresh(prev => !prev);
            })
    }
    
    return(
        <div style={{width:'500px', margin:'auto'}}>
            <Link to="/" style={{textDecoration:'none', cursor:'pointer'}} onClick={() => {
                localStorage.removeItem('access_token');
            }}>
                &larr; Go Back Home
            </Link>
            <h1>Todos</h1>
            <form onSubmit={onSubmit} style={{marginBottom:'20px'}}>
                <input data-testid="new-todo-input" type="text" onChange={(e) => {setNewtodo(e.currentTarget.value)}} name="newTodo"/>
                <button data-testid="new-todo-add-button">추가</button>
            </form>
            <div>
                {
                    todos.map((todo) => {
                        return (
                            <TodoObj todo={todo} setRefresh={setRefresh}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Todo;