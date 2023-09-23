import { useTodolistsContext } from '../hooks/useTodolistsContext'
import { useAuthContext } from '../hooks/useAuthContext'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const TodolistDetails = ({ todolist }) => {
    const { dispatch } = useTodolistsContext()
    const { user } = useAuthContext()
    
    const handleClick = async () => {
        if (!user) {
            return
        }


        const response = await fetch('/api/todolists/' + todolist._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_TODOLIST', payload: json})
        }
    }
    
    
    return (
        <div className="todolist-details">
            <h4>{todolist.title}</h4>
            <p><strong>Post: </strong>{todolist.mpost}</p>
            <p>{formatDistanceToNow(new Date(todolist.createdAt))}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
        </div>
    )
}

export default TodolistDetails


