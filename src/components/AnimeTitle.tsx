import React, {FC, ReactElement, useEffect, useState} from 'react';
import {BriefTitleVM, Client, TitleDetailsVM} from "../api/api";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {getTitleDetails} from "../store/actions-creators/titleDetails";
import {useActions} from "../hooks/useActions";

const apiClient = new Client('https://localhost:5001');

const AnimeTitle: FC = (): ReactElement => {
    const [descriptionHtml, setDescriptionHtml] = useState<string | undefined>("")
    const {titleDetails, loading, error, currentId} = useTypedSelector(state => state.titleDetails)
    const {getTitleDetails} = useActions()

    function createMarkup() {
        return {__html: `${descriptionHtml}`};
    }

    useEffect(() => {
        //getTitleDetails("24617079-72ee-4f6e-8390-02cc2e97afb7")
        getTitleDetails(currentId)
        console.log("get")
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
            <img src={"https://shikimori.one/" + titleDetails?.image?.preview}/>
            <div>{titleDetails?.score}</div>
            <div dangerouslySetInnerHTML={createMarkup()} />
        </div>
    );
};

export default AnimeTitle;