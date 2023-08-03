import axios from "axios";
import { useState } from "react";

function TodoObj({todo, setRefresh}) {
    const access_token = localStorage.getItem('access_token');
    const [todoData, setTodoData] = useState(todo.todo);
    const [isUpdate, setIsUpdate] = useState(false);

    return (
        <li key={todo.id}>
            <label>
                <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={(e) => {
                        axios
                            .put(
                                `https://www.pre-onboarding-selection-task.shop/todos/${todo.id}`,
                                {
                                    todo: todo.todo,
                                    isCompleted: e.currentTarget.checked,
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${access_token}`,
                                    },
                                }
                            )
                            .then((response) => {
                                setRefresh(prev => !prev);
                            });
                    }}
                />
                {isUpdate ? (
                    <input data-testid="modify-input" type="text" value={todoData} onChange={(e) => {setTodoData(e.currentTarget.value)}}/>
                ) : (
                    <span>{todo.todo}</span>
                )}
            </label>
            {isUpdate ? (
                <>
                    <button
                        data-testid="submit-button"
                        onClick={(e) => {
                            axios
                                .put(
                                    `https://www.pre-onboarding-selection-task.shop/todos/${todo.id}`,
                                    {
                                        todo: todoData,
                                        isCompleted: todo.isCompleted,
                                    },
                                    {
                                        headers: {
                                            Authorization: `Bearer ${access_token}`,
                                        },
                                    }
                                )
                                .then((response) => {
                                    setRefresh(prev => !prev);
                                    setIsUpdate(false);
                                });
                        }}
                    >
                        제출
                    </button>
                    <button
                        data-testid="cancel-button"
                        onClick={() => {
                            setIsUpdate(false);
                        }}
                    >
                        취소
                    </button>
                </>
            ) : (
                <>
                    <button
                        data-testid="modify-button"
                        onClick={() => {
                            setIsUpdate(true);
                        }}
                    >
                        수정
                    </button>
                    <button
                        data-testid="delete-button"
                        onClick={(e) => {
                            axios
                                .delete(
                                    `https://www.pre-onboarding-selection-task.shop/todos/${todo.id}`,
                                    {
                                        headers: {
                                            Authorization: `Bearer ${access_token}`,
                                        },
                                    }
                                )
                                .then((response) => {
                                    setRefresh(prev => !prev);
                                });
                        }}
                    >
                        삭제
                    </button>
                </>
            )}
        </li>
    );
}

export default TodoObj;