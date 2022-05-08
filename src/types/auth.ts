import {TitleDetailsVM} from "../api/api";
import {TitleDetailsActionTypes} from "./titleDetails";

export interface AuthState {
    isAuth: boolean;
    loading: boolean;
    error: null | string;
}


export enum AuthActionTypes {
    LOGIN = "LOGIN",
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_ERROR = "LOGIN_ERROR",

    REGISTER = "REGISTER",
    REGISTER_SUCCESS  = "REGISTER_SUCCESS",
    REGISTER_ERROR  = "REGISTER_ERROR",

    LOGOUT = "LOGOUT",
    LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
    LOGOUT_ERROR = "LOGOUT_ERROR",
}


export interface LoginAction {
    type: AuthActionTypes.LOGIN;
}

export interface LoginActionSuccess {
    type: AuthActionTypes.LOGIN_SUCCESS;
    payload: boolean;
}

export interface LoginActionError {
    type: AuthActionTypes.LOGIN_ERROR;
    payload: string | null;
}


export interface RegisterAction {
    type: AuthActionTypes.REGISTER;
}

export interface RegisterActionSuccess {
    type: AuthActionTypes.REGISTER_SUCCESS;
    payload: boolean;
}

export interface RegisterActionError {
    type: AuthActionTypes.REGISTER_ERROR;
    payload: string | null;
}


export interface LogoutAction {
    type: AuthActionTypes.LOGOUT;
}

export interface LogoutActionSuccess {
    type: AuthActionTypes.LOGOUT_SUCCESS;
    payload: boolean;
}

export interface LogoutActionError {
    type: AuthActionTypes.LOGOUT_ERROR;
    payload: string | null;
}


export type AuthAction = LoginAction
    | LoginActionSuccess
    | LoginActionError
    | RegisterAction
    | RegisterActionSuccess
    | RegisterActionError
    | LogoutAction
    | LogoutActionSuccess
    | LogoutActionError;
