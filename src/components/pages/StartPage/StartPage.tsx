import React from 'react';
import css from './StartPage.module.css'
import Intro from '../../UI/Intro/Intro';
import Slider from '../../UI/Slider/Slider';


const StartPage = () => {
    return (
        <div className={css.startPage}>
            <Intro />
            <Slider />
        </div>
    );
};

export default StartPage;