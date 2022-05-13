import React, { useEffect, useState } from 'react';
import AnimeList from "./components/AnimeList";
import AnimeTitle from "./components/AnimeTitle";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from "./components/authorization/LoginForm/LoginForm";
import UserMenu from "./components/UserMenu/UserMenu";
import HeaderNotAuthorize from './components/HeaderNotAuthorize/HeaderNotAuthorize';
import MainPage from './components/MainPage/MainPage';
import Footer from './components/Footer/Footer';

const App = () => {

    return (
        <div>
            <HeaderNotAuthorize />
            <MainPage />
            <Footer />
            <hr />
            <LoginForm />
            <hr />
            <UserMenu />
            <hr />
            <AnimeTitle />
            <hr />
            <AnimeList />
        </div>
    );
};

export default App;