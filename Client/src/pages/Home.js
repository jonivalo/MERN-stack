import { useEffect } from 'react'
import { useTodolistsContext } from '../hooks/useTodolistsContext'
import { useAuthContext, userAuthContext } from '../hooks/useAuthContext'

// components
import TodolistDetails from '../components/TodolistDetails'
import TodolistForm from '../components/TodolistForm'

const Home = () => {
    const {todolists, dispatch} = useTodolistsContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchTodolists = async () => {
            const response = await fetch ('/api/todolists', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
               dispatch({type: 'SET_TODOLISTS', payload: json})
            }
        }

        if(user) {
            fetchTodolists()
        }
    }, [dispatch, user])


    return (
        <div className="home">
                <div className="todolists">
                    {todolists && todolists.map((todolist) => (
                        <TodolistDetails key={todolist._id} todolist={todolist} />
                    ))}
                </div>
                <TodolistForm />
        </div>
    )
}

export default Home