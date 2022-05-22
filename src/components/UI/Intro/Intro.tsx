import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';
import css from './Intro.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Intro = () => {
    const navigate = useNavigate();

    return (
        <div className="App">
            <div className={css.intro} id="intro">
                <div className={css.container}>
                    <div className={css.intro_inner}>
                        <h1 className={css.intro_title}>AniRate</h1>
                        <div className={css.buttons}>

                            <Button className={css.button}
                                onClick={() => navigate(`/collections`)}
                                variant="outline-dark" size="lg"
                            >
                                Коллекции
                            </Button>


                            <Button className={css.button}
                                onClick={() => navigate(`/animes`)}
                                variant="outline-dark" size="lg"
                            >
                                Аниме
                            </Button>                            
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Intro;