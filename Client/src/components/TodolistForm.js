import { useState } from 'react'
import { useTodolistsContext } from '../hooks/useTodolistsContext'
import { useAuthContext } from '../hooks/useAuthContext'


const TodolistForm = () => {
    const { dispatch } = useTodolistsContext()
    const { user } = useAuthContext()
    
    const [title, setTitle] = useState('')
    const [mpost, setMpost] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const todolist = {title, mpost}

        const response = await fetch('/api/todolists', {
            method: 'POST',
            body: JSON.stringify(todolist),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setMpost('')
            setError(null)
            setEmptyFields([])
            console.log('new list added', json)
            dispatch({type: 'CREATE_TODOLIST', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new list</h3>

            <label>Title:</label>
            <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className = {emptyFields.includes('title') ? 'error' : ''}
            />
            <label>Message:</label>
            <input
            type="text"
            onChange={(e) => setMpost(e.target.value)}
            value={mpost}
            className = {emptyFields.includes('mpost') ? 'error' : ''}
            />
        <button>Add message</button>
        {error && <div className="error">{error}</div>}
        </form>
    )



}

export default TodolistForm


