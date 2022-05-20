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


export const register = (email: string, password: string, confirmPassword: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({
                type: AuthActionTypes.REGISTER
            })

            await apiClient.register({ password: password, username: email, confirmPassword: confirmPassword });

            localStorage.setItem('auth', 'true')

            dispatch({
                type: AuthActionTypes.REGISTER_SUCCESS,
            })
        } catch (e) {
            let msg = "Ошибка при регистрации пользователя";
            if (e instanceof Error) {
                console.log(e.message);
                msg = e.message;
            }
            localStorage.setItem('auth', 'false')

            dispatch({
                type: AuthActionTypes.REGISTER_ERROR,
                payload: msg,
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