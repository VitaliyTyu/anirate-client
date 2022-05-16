import React, { useEffect, useState } from 'react';
import AnimeList from "./components/UserMenu/AnimeList/AnimeList";
import AnimeTitle from "./components/UserMenu/AnimeTitle/AnimeTitle";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from "./components/authorization/LoginForm/LoginForm";
import UserMenu from "./components/UserMenu/UserMenu";
import Header from './components/UI/Header/Header';
import Footer from './components/UI/Footer/Footer';
import CollectionsList from './components/CollectionsList';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ExactAnimePage from './components/pages/ExactAnimePage/ExactAnimePage';
import MainPage from './components/pages/MainPage/MainPage';

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
            
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/title" element={<ExactAnimePage />} />
                <Route path="/animes" element={<AnimeList />} />
                <Route path="/animes/:id" element={<ExactAnimePage />} />
            </Routes>            
            <Footer />
        </BrowserRouter>
    );
};

export default App;