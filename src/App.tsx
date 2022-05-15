import React, { useEffect, useState } from 'react';
import AnimeList from "./components/AnimeList";
import AnimeTitle from "./components/AnimeTitle";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from "./components/authorization/LoginForm/LoginForm";
import UserMenu from "./components/UserMenu/UserMenu";
import Header from './components/UI/Header/Header';
import Footer from './components/UI/Footer/Footer';
import CollectionsList from './components/CollectionsList';
import StartPage from './components/pages/StartPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ExactAnimePage from './components/pages/ExactAnimePage/ExactAnimePage';

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
            
            <Header /> {/*заменить на <Navbar /> */}
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/title" element={<ExactAnimePage />} />
                <Route path="/animes" element={<AnimeList />} />
                <Route path="/animes/:id" element={<ExactAnimePage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default App;