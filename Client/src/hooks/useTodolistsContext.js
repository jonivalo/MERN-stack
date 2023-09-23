import { TodolistsContext } from '../context/TodolistContext';
import { useContext } from 'react';

export const useTodolistsContext = () => {
    const context = useContext(TodolistsContext)

    if (!context) {
        throw Error('useTodolistContext must be used inside an TodolistContextProvider')
    }


    return context
}