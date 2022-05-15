import React from 'react';
import css from './MainPage.module.css'
import Intro from '../Intro/Intro';
import Slider from '../Slider/Slider';


const MainPage = () => {
    return (
        <div className={css.mainPage}>
            <Intro />
            <Slider />
        </div>
    );
};

export default MainPage;