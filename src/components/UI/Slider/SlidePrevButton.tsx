import React from 'react';
import { useSwiper } from 'swiper/react';
import css from './SlidePrevButton.module.css'

export default function SlidePrevButton() {
    const swiper = useSwiper();

    return (
        <div>
            <a onClick={() => swiper.slidePrev()} className={css.gradient_button} >
                <div className={css.arrow2}>
                    <div className={css.arrow2Top}></div>
                    <div className={css.arrow2Bottom}></div>
                </div>
            </a>
        </div>
    )
}
