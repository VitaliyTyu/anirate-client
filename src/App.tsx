import React, {useEffect, useState} from 'react';
import AnimeList from "./components/AnimeList";
import AnimeTitle from "./components/AnimeTitle";
import Slider from './components/Slider/Slider';
import HeaderNotAuthorize from './components/HeaderNotAuthorize/HeaderNotAuthorize';
import HeaderNotAuthorize1 from './components/HeaderNotAuthorize1/HeaderNotAuthorize1'
import MainPage from './components/MainPage/MainPage';



const App = () => {
  return (
      <div>
           {/* {/* <AnimeTitle/>
              <hr/>
             <AnimeList/> 
            <Slider/> */}
             <HeaderNotAuthorize1/>
             <MainPage/>
             <Slider/>
      </div>
  );
};

export default App;