import { ApiException, TitleDetailsVM } from "../api/api";
import { TitleDetailsActionTypes } from "./titleDetails";

export interface AuthState {
    isAuth: boolean;
    loading: boolean;
    error: null | ApiException;
}


export enum AuthActionTypes {
    LOGIN = "LOGIN",
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_ERROR = "LOGIN_ERROR",

    REGISTER = "REGISTER",
    REGISTER_SUCCESS = "REGISTER_SUCCESS",
    REGISTER_ERROR = "REGISTER_ERROR",

    LOGOUT = "LOGOUT",
}


export interface LoginAction {
    type: AuthActionTypes.LOGIN;
}

export interface LoginActionSuccess {
    type: AuthActionTypes.LOGIN_SUCCESS;
}

export interface LoginActionError {
    type: AuthActionTypes.LOGIN_ERROR;
    payload: ApiException | null;
}


export interface RegisterAction {
    type: AuthActionTypes.REGISTER;
}

export interface RegisterActionSuccess {
    type: AuthActionTypes.REGISTER_SUCCESS;
}

export interface RegisterActionError {
    type: AuthActionTypes.REGISTER_ERROR;
    payload: ApiException | null;
}


export interface LogoutAction {
    type: AuthActionTypes.LOGOUT;
}



export type AuthAction = LoginAction
    | LoginActionSuccess
    | LoginActionError
    | RegisterAction
    | RegisterActionSuccess
    | RegisterActionError
    | LogoutAction;
