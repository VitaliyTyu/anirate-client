import { TitleDetailsVM } from "../../api/api";
import { AuthAction, AuthActionTypes, AuthState } from "../../types/auth";

const initialState: AuthState = {
    error: null,
    loading: false,
    isAuth: false,
}

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionTypes.LOGIN:
            return { error: null, loading: true, isAuth: false }
        case AuthActionTypes.LOGIN_SUCCESS:
            return { error: null, loading: false, isAuth: action.payload }
        case AuthActionTypes.LOGIN_ERROR:
            return { error: action.payload, loading: false, isAuth: false }
        default:
            return state
    }
}