import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/UI/Header/Header';
import Footer from './components/UI/Footer/Footer';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppRouter from "./components/AppRouter";
import { useEffect, useState } from "react";
import { AuthContext } from "./context/context";

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
            </BrowserRouter>
        </AuthContext.Provider>
    );
};

export default App;