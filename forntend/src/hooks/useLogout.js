import useAuthContext from "./useAuthContext";
import useWorkoutsContext from "./useWorkoutsContext";

export const useLogout = () => {
    const {dispatch} = useAuthContext();
    const {dispatch: workoutContext} = useWorkoutsContext()

    const logout = () => {
        // remove user from local storage to logout
        localStorage.removeItem('user')
        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        workoutContext({type:'SET_WORKOUTS', payload: null})
    }

    return{logout}
}