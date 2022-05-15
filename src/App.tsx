import React, { useEffect, useState } from 'react';
import AnimeList from "./components/AnimeList";
import AnimeTitle from "./components/AnimeTitle";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from "./components/authorization/LoginForm/LoginForm";
import UserMenu from "./components/UserMenu/UserMenu";
import HeaderNotAuthorize from './components/HeaderNotAuthorize/HeaderNotAuthorize';
import MainPage from './components/MainPage/MainPage';
import Footer from './components/Footer/Footer';
import CollectionsList from './components/CollectionsList';
import StartPage from './components/pages/StartPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ExactAnimePage from './components/pages/ExactAnimePage';

const App = () => {

    return (
        // <div>
        //     <StartPage />

        //     <hr />
        //     <LoginForm />
        //     <hr />
        //     <UserMenu />
        //     <hr />
        //     <AnimeTitle />
        //     <hr />
        //     <AnimeList />
        //     <hr />
        //     <CollectionsList />
        // </div>
        <BrowserRouter>
            <HeaderNotAuthorize /> {/*заменить на <Navbar /> */}

            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/title" element={<ExactAnimePage />} />
                <Route path="/animes" element={<AnimeList />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
};

export default App;