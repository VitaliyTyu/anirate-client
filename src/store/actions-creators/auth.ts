import { ApiException, Client, LoginViewModel, RegisterViewModel } from "../../api/api";
import { Dispatch } from "redux";
import { AuthAction, AuthActionTypes } from "../../types/auth";
import { useNavigate } from "react-router-dom";

const apiClient = new Client('https://localhost:5001');

export const login = (loginVM: LoginViewModel) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({
                type: AuthActionTypes.LOGIN
            })

            console.log("login");

            let userInfo = await apiClient.login(loginVM);
            localStorage.setItem('token', userInfo.token ? userInfo.token : '');
            localStorage.setItem('auth', 'true')

            dispatch({
                type: AuthActionTypes.LOGIN_SUCCESS,
            })
        } catch (e) {
            localStorage.setItem('auth', 'false')
            console.log(localStorage.getItem('auth'));

            dispatch({
                type: AuthActionTypes.LOGIN_ERROR,
                payload: e as ApiException
            })
        }
    }
}


export const register = (registerVm: RegisterViewModel) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({
                type: AuthActionTypes.REGISTER
            })

            console.log("register");

            let userInfo = await apiClient.register(registerVm);
            localStorage.setItem('token', userInfo.token ? userInfo.token : '');
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
                payload: e as ApiException,
            })
        }
    }
}


export const logout = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        localStorage.setItem('token', '')
        localStorage.setItem('auth', 'false')
        console.log("выход");

        dispatch({
            type: AuthActionTypes.LOGOUT
        })
    }
}

export const authCheck = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            await apiClient.check();
        } catch (e) {
            localStorage.setItem('token', '')
            localStorage.setItem('auth', 'false')
            console.log("выход");

            dispatch({
                type: AuthActionTypes.LOGOUT
            })
        }
    }
}