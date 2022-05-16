import React, { FC, ReactElement, useEffect, useState } from 'react';
import { BriefTitleVM, Client, TitleDetailsVM } from "../api/api";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { getTitleDetails } from "../store/actions-creators/titleDetails";
import { useActions } from "../hooks/useActions";
import { useNavigate } from 'react-router-dom';

const apiClient = new Client('https://localhost:5001');

interface AnimeTitleProps {
    clickFunction: () => void;
    title?: BriefTitleVM;
    children?: React.ReactChild | React.ReactNode;
}

const AnimeTitle: FC<AnimeTitleProps> = (props): ReactElement => {
    const [descriptionHtml, setDescriptionHtml] = useState<string | undefined>("")
    const { titleDetails, loading, error, currentId } = useTypedSelector(state => state.titleDetails)
    const { getTitleDetails, setCurrentTitleDetails } = useActions()

    function createMarkup() {
        return { __html: `${descriptionHtml}` };
    }

    useEffect(() => {
        getTitleDetails(props.title?.id)
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
            <div
                onClick={() => props.clickFunction()}
            >
                <div style={{ marginTop: 10 }}>{props.title?.russian}</div>
                <img src={"https://shikimori.one/" + props.title?.image?.preview} />
                <div>{props.title?.score}</div>
            </div>
        </div>
    );
};

export default AnimeTitle;