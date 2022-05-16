import { Client } from "../../api/api";
import { Dispatch } from "redux";
import { AuthAction, AuthActionTypes } from "../../types/auth";
import { useNavigate } from "react-router-dom";

const apiClient = new Client('https://localhost:5001');

export const login = (email: string, password: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({
                type: AuthActionTypes.LOGIN
            })

            await apiClient.login({ password: password, username: email });

            localStorage.setItem('auth', 'true')
            console.log(localStorage.getItem('auth'));


            dispatch({
                type: AuthActionTypes.LOGIN_SUCCESS,
            })
        } catch (e) {
            localStorage.setItem('auth', 'false')
            console.log(localStorage.getItem('auth'));

            dispatch({
                type: AuthActionTypes.LOGIN_ERROR,
                payload: "Ошибка при входе пользователя"
            })
        }
    }
}

export const logout = () => {

    return async (dispatch: Dispatch<AuthAction>) => {
        localStorage.setItem('auth', 'false')
        console.log("выход");

        dispatch({
            type: AuthActionTypes.LOGOUT
        })
    }
}