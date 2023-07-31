import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Todo() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewtodo] = useState('');

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if(!access_token) {
            navigate('/signin')
        }
        axios.get('https://www.pre-onboarding-selection-task.shop/todos', {
            headers: {Authorization : `Bearer ${access_token}`}
        })
            .then((response) => {
                setTodos(response.data);
            })
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        const access_token = localStorage.getItem('access_token');

        axios.post('https://www.pre-onboarding-selection-task.shop/todos', {
            todo: newTodo
        },{
            headers: {Authorization : `Bearer ${access_token}`}
        })
            .then((response) => {
                window.location.reload();
            })
    }
    
    return(
        <div>
            <h1>Todos</h1>
            <form onSubmit={onSubmit}>
                <input data-testid="new-todo-input" type="text" onChange={(e) => {setNewtodo(e.currentTarget.value)}} name="newTodo"/>
                <button data-testid="new-todo-add-button">추가</button>
            </form>
            <div>
                {
                    todos.map((todo) => {
                        return (
                            <li key={todo.id}>
                                <label>
                                    <input type="checkbox" checked={todo.isCompleted} onChange={(e) => {
                                        const access_token = localStorage.getItem('access_token');

                                        axios.put(`https://www.pre-onboarding-selection-task.shop/todos/${todo.id}`, {
                                            todo:todo.todo,
                                            isCompleted:e.currentTarget.checked
                                        }, {
                                            headers: {Authorization : `Bearer ${access_token}`}
                                        })
                                            .then((response) => {
                                                window.location.reload();
                                            })
                                    }}/>
                                    <span>{todo.todo}</span>
                                </label>
                                <button data-testid="modify-button">수정</button>
                                <button data-testid="delete-button">삭제</button>
                            </li>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Todo;