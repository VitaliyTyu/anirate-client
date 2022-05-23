import React, { FC, ReactElement } from 'react';
import css from './StartPage.module.css'
import Intro from '../../UI/Intro/Intro';
import Slider from '../../UI/Slider/Slider';


const StartPage: FC = (): ReactElement => {
    return (
        <div className={css.startPage}>
            <Intro />
            <Slider />
        </div>
    );
};

export default StartPage;