import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import css from './ExactAnimePage.module.css'


const ExactAnimePage = () => {
    const [descriptionHtml, setDescriptionHtml] = useState<string | undefined>("")
    const { titleDetails, loading, error } = useTypedSelector(state => state.titleDetails)
    const { getTitleDetails } = useActions()
    const params = useParams()

    function createMarkup() {
        return { __html: `${descriptionHtml}` };
    }

    useEffect(() => {
        getTitleDetails(params.id)
    }, []);


    useEffect(() => {
        if (!error) {
            setDescriptionHtml(titleDetails?.descriptionHtml)
        }
    }, []);

    // if (loading) {
    //     return <h1>Идет загрузка...</h1>
    // }

    if (error) {
        return <h1>{error}</h1>
    }



    return (
        <div className={css.animepages}>  
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
                            <div className={css.genre}>
                                <div >Жанры: </div>
                                {titleDetails?.genres?.map((genre) =>(
                                    <div style = {{marginLeft: '5px'}}>{genre.russian}</div>
                                ))}                                           
                            </div>
                            
                           
                            <div>Описание:</div>
                            <div className={css.descript} dangerouslySetInnerHTML={createMarkup()} />              
                        </div>                   
                    </div>
                    
                    <div className={css.buttonsElems}>                        
                        <a href='/#' className={css.buttonStart}>Добавить в коллекцию</a>                                        
                    </div>         
                </div>
        </div>
    );
};

export default ExactAnimePage;