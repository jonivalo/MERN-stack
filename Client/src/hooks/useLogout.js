import { useAuthContext } from "./useAuthContext"
import { useTodolistsContext } from "./useTodolistsContext"


export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: todolistsDispatch } = useTodolistsContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        todolistsDispatch({type: 'SET_TODOLISTS', payload: null})
    }

    return {logout}
}