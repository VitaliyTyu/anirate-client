import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/UI/Header/Header';
import Footer from './components/UI/Footer/Footer';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppRouter from "./components/AppRouter";
import { useEffect, useState } from "react";
import { AuthContext } from "./context/context";
import css from '../src/styles/App.module.css'

const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('auth') === "true") {
            setIsAuth(true)
        }
        setIsLoading(false)
    }, [])

    useEffect(() => {
        if (localStorage.getItem('auth') === "true") {
            setIsAuth(true)
        }
        setIsLoading(false)
    }, [localStorage.getItem("auth")])

    return (
        <div className={css.all}>
            <AuthContext.Provider value={{
                isAuth,
                setIsAuth,
                isLoading,
            }}>
                
                <BrowserRouter>
                <div className={css.mainBody}>
                    <div className={css.header}> 
                        <Header />
                    </div>
                    <div className={css.mainContent}>
                        <AppRouter />
                    </div>
                    <div className={css.footer}>
                        <Footer />
                    </div>
                </div>
                </BrowserRouter>
                
            </AuthContext.Provider>
        </div>
    );
};

export default App;