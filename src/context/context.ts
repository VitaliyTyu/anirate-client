import React, { Dispatch, SetStateAction } from "react";
import { createContext, FC } from "react";

export interface IAuth {
    isAuth: boolean;
    // isLoading: boolean;
    setIsAuth: Dispatch<SetStateAction<boolean>>;
    // token: string | null;
    // handleAuthentication: () => void;
    // login: () => void;
    // logout: () => void;
}

export const authDefaults: IAuth = {
    isAuth: false,
    // isLoading: false,
    setIsAuth: () => null,
    // token: null,
    // handleAuthentication: () => null,
    // login: () => null,
    // logout: () => null
};

export const AuthContext = React.createContext<IAuth>(authDefaults);