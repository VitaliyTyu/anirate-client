import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import css from './Intro.module.css'



const Intro = () => {
    const navigate = useNavigate();
    return (
        <div className="App">
            <div className={css.intro} id="intro">
                <div className={css.container}>
                    <div className={css.intro_inner}>
                        <h1 className={css.intro_title}>Добро пожаловать в AniRate</h1>
                        <Button
                            onClick={() => navigate(`/collections`)}
                        >
                            Перейти к коллекциям
                        </Button>
                        <Button onClick={() => navigate(`/animes`)} >
                            Перейти к аниме
                        </Button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Intro;