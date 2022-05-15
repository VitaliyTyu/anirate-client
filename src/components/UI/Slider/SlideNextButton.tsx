import React  from 'react';
import { useSwiper } from 'swiper/react';
import css from './sliderButton.module.css'



export default function SlideNextButton() {
  const swiper = useSwiper();

  return (
    <div >
      <a onClick={() => swiper.slideNext()} className={css.gradient_button}>      
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="20" fill="currentColor" className="bi bi-caret-right-square" viewBox="0 0 20 16">
          
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          <path d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z"/>
        
        </svg>
      </a>
    </div>
    
  );
}