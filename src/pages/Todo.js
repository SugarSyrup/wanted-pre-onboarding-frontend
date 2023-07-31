import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Todo() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const access_token = localStorage.getItem('accesstoken');
        if(!access_token) {
            navigate('/signin')
        }
        axios.get('https://www.pre-onboarding-selection-task.shop/auth/todos', {
            headers: {Authorization : `Bearer ${access_token}`}
        })
            .then((response) => {
                setTodos(response.data);
            })
    }, [])
    
    return(
        <div>
            <h1>Todos</h1>
            <div>
                {
                    todos.map((todo) => {
                        return (
                            <li key={todo.id}>
                                <label>
                                    <input type="checkbox" checked={todo.isCompleted}/>
                                    <span>{todo.todo}</span>
                                </label>
                            </li>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Todo;