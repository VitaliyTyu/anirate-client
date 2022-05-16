import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import AnimeTitle from '../../UserMenu/AnimeTitle/AnimeTitle';
import css from './ExactAnimePage.module.css'

const ExactAnimePage = () => {
    const [descriptionHtml, setDescriptionHtml] = useState<string | undefined>("")
    const { titleDetails, loading, error, currentId } = useTypedSelector(state => state.titleDetails)
    const { getTitleDetails, setCurrentTitleDetails } = useActions()
    const params = useParams()

    function createMarkup() {
        return { __html: `${descriptionHtml}` };
    }

    useEffect(() => {
        // getTitleDetails(currentId)
        getTitleDetails(params.id)
        setCurrentTitleDetails(params.id)
    }, [currentId]);


    useEffect(() => {
        if (!error) {
            setDescriptionHtml(titleDetails?.descriptionHtml)
        }
    }, [titleDetails]);

    if (loading) {
        return <h1>Идет загрузка...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }
    
    let genresToString: string = "";    
    titleDetails?.genres?.map((genre) =>(genresToString += genre.russian + " "))
    
    return (
        <div className={css.animepages}>
            <div className={css.box1}>  
                <div className={css.animeInfo}>
                    <div className={css.info}>                                         
                        <div className={css.leftside} >
                            <div className={css.title}>{titleDetails?.russian}</div>
                            <div className={css.title}>
                                <img src={"https://shikimori.one/" + titleDetails?.image?.original} />  
                            </div>                    
                        </div>
                        
                        <div className={css.rightside}>    
                            <div className={css.details}>Рейтинг: {titleDetails?.score}</div> 
                            <div className={css.details}>Эпизоды: {titleDetails?.episodes}</div> 
                            <div className={css.details}>Жанры: {genresToString}</div> 
                            <div>Описание:</div>
                            <div className={css.descript} dangerouslySetInnerHTML={createMarkup()} />              
                        </div>                   
                    </div>
                    
                    <div className={css.buttonsElems}>                        
                        <a href='/#' className={css.buttonStart}>Добавить в коллекцию</a>                                        
                    </div>         
                </div>
            </div> 
        </div>
    );
};

export default ExactAnimePage;