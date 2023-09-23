import { createContext, useReducer } from 'react'

export const TodolistsContext = createContext()

export const todolistsRecuder = (state, action) => {
    switch(action.type) {
        case 'SET_TODOLISTS':
            return {
                todolists: action.payload
            }
        case 'CREATE_TODOLIST':
                return {
                    todolists: [action.payload, ...state.todolists]
                }
        case 'DELETE_TODOLIST':
            return {
                    todolists: state.todolists.filter((w) => w._id !== action.payload._id)
                }
        default:
            return state
    }
}

export const TodolistsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(todolistsRecuder, {
        todolists: null
    })

   
    return (
        <TodolistsContext.Provider value={{...state, dispatch}}>
            { children }
        </TodolistsContext.Provider>
    )
}