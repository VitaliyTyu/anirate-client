import React from 'react';
import css from './Intro.module.css'



const Intro = () => {
    return (
        <div className="App">
            <div className={css.intro} id="intro">
                <div className={css.container}>  
                    <div className={css.intro_inner}>
                        <h1 className={css.intro_title}>Добро пожаловать в AniRate</h1>  
                        <div className={css.buttons}>
                            <a className={css.buttonStart} href="/author">Перейти к коллекциям</a> 
                            <a className={css.buttonStart} href="/animes">Перейти к аниме</a>  
                        </div>
                                              
                    </div>                    
                </div>    
            </div>  
        </div> 
    );
};

export default Intro;