import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Todo() {
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('accesstoken')) {
            navigate('/signin')
        }
    }, [])
    
    return(
        <div>
            Todo
        </div>
    )
}

export default Todo;