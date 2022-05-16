import React, { useContext } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/context';
import { useTypedSelector } from '../hooks/useTypedSelector';
import ExactAnimePage from './pages/ExactAnimePage/ExactAnimePage';
import StartPage from './pages/StartPage';
import { privateRoutes, publicRoutes } from './router/routes';

const AppRouter = () => {
    //const { isAuth, isLoading } = useContext(AuthContext);
    const { isAuth, } = useTypedSelector(state => state.auth)

    // console.log(isAuth)

    return (
        isAuth
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={<route.component />}
                        key={route.path}
                    />
                )}
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={<route.component />}
                        key={route.path}
                    />
                )}
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
    );
};

export default AppRouter;