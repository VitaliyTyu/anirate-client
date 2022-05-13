import React from 'react';
import css from './Intro.module.css'



const Intro = () => {
    return (
        <div className="App">
            <div className={css.intro} id="intro">
                <div className={css.container}>  
                    <div className={css.intro_inner}>
                        <h1 className={css.intro_title}>Добро пожаловать в AniRate</h1>  
                        <a className={css.buttonStart} href="#">Перейти к коллекциям</a>
                        
                    </div>
                    
                </div>    
            </div>  
        </div> 
    );
};

export default Intro;