import React from 'react';
import css from './MainPage.module.css'
import Intro from '../../UI/Intro/Intro';
import Slider from '../../UI/Slider/Slider';


const MainPage = () => {
    return (
        <div className={css.mainPage}>
            <Intro />
            <Slider />
        </div>
    );
};

export default MainPage;