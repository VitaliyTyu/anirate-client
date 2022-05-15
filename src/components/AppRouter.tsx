import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ExactAnimePage from './pages/ExactAnimePage';
import StartPage from './pages/StartPage';

const AppRouter = () => {
    return (
        <Routes>
            {/* {publicRoutes.map(route =>
                <Route
                    exact={route.exact}
                    path={route.path}
                    element={<route.component />}
                    key={route.path}
                />
            )} */}
            <Route path="/" element={<StartPage />} />
            <Route path="/title" element={<ExactAnimePage />} />
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    );
};

export default AppRouter;