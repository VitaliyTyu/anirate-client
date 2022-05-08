import React, {useEffect, useState} from 'react';
import AnimeList from "./components/AnimeList";
import AnimeTitle from "./components/AnimeTitle";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from "./components/authorization/LoginForm/LoginForm";
import UserMenu from "./components/UserMenu/UserMenu";

const App = () => {

    return (
        <div>
            <LoginForm/>
            <hr/>
            <UserMenu/>
            <hr/>
            <AnimeTitle/>
            <hr/>
            <AnimeList/>
        </div>
  );
};

export default App;