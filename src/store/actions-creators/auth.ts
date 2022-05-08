import {Client} from "../../api/api";
import {Dispatch} from "redux";
import {AuthAction, AuthActionTypes} from "../../types/auth";

const apiClient = new Client('https://localhost:5001');

export const login = (email: string, password: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({
                type: AuthActionTypes.LOGIN
            })

            await apiClient.login({password: password, username: email});

            dispatch({
                type: AuthActionTypes.LOGIN_SUCCESS,
                payload: true,
            })
        } catch (e) {
            dispatch({
                type: AuthActionTypes.LOGIN_ERROR,
                payload: "Ошибка при входе пользователя"
            })
        }
    }
}