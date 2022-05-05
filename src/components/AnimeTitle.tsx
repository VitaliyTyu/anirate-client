import React, {FC, ReactElement, useEffect, useState} from 'react';
import {BriefTitleVM, Client, TitleDetailsVM} from "../api/api";

const apiClient = new Client('https://localhost:5001');



const AnimeTitle: FC = (): ReactElement => {
    const [titleDetails, setTitleDetails] = useState<TitleDetailsVM | undefined>()
    const [descriptionHtml, setDescriptionHtml] = useState<string | undefined>("")

    function createMarkup() {
        return {__html: `${descriptionHtml}`};
    }

    async function getTitleDetails() {
        const titleDetails = await apiClient.animeTitleDetails("24617079-72ee-4f6e-8390-02cc2e97afb7");
        //console.log(titleDetails)
        setTitleDetails(titleDetails);
        setDescriptionHtml(titleDetails?.descriptionHtml)
    }

    useEffect(() => {
        getTitleDetails()
    }, []);

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