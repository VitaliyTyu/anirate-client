import AnimeList from "./components/AnimeList";
import AnimeTitle from "./components/AnimeTitle";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/UI/Header/Header';
import Footer from './components/UI/Footer/Footer';
import StartPage from './components/pages/StartPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ExactAnimePage from './components/pages/ExactAnimePage/ExactAnimePage';
import AppRouter from "./components/AppRouter";
import { useEffect, useState } from "react";
import LoginForm from "./components/authorization/LoginForm/LoginForm";
import { AuthContext } from "./context/context";
import UserMenu from "./components/UI/UserMenu/UserMenu";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { AuthActionTypes } from "./types/auth";

const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    //const { isAuth, } = useTypedSelector(state => state.auth)
    //const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem('auth') === "true") {
            setIsAuth(true)
        }
        setIsLoading(false)
    }, [localStorage.getItem("auth")])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading,
        }}>
            <BrowserRouter>
                <Header />
                <AppRouter />
                <Footer />
                <LoginForm />
                <UserMenu />
            </BrowserRouter>
        </AuthContext.Provider>
    );
};

export default App;