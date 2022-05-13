import React, {useEffect, useState} from 'react';
import AnimeList from "./components/AnimeList";
import AnimeTitle from "./components/AnimeTitle";
import Slider from './components/Slider/Slider';
import HeaderNotAuthorize from './components/HeaderNotAuthorize/HeaderNotAuthorize';
import HeaderNotAuthorize1 from './components/HeaderNotAuthorize1/HeaderNotAuthorize1'
import Intro from './components/Intro/Intro';
import Footer from './components/Footer/Footer';
import MainPage from './components/MainPage/MainPage';

const App = () => {
  return (
      <div>
           {/* <AnimeTitle/>
              <hr/>
             <AnimeList/> 
            <Slider/> */}
             <HeaderNotAuthorize/>
             <MainPage/>
             <Footer/>
      </div>
  );
};

export default App;