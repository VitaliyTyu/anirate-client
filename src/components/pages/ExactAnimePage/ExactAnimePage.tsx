import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import AnimeTitle from '../../AnimeTitle';

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

    return (
        <div>
            <div>{titleDetails?.russian}</div>
            <img src={"https://shikimori.one/" + titleDetails?.image?.original} />
            <div>{titleDetails?.score}</div>
            <div dangerouslySetInnerHTML={createMarkup()} />
        </div>
    );
};

export default ExactAnimePage;