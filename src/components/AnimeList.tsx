import React, {FC, ReactElement, useEffect, useState} from 'react';
import {BriefTitleVM, BriefTitleVMPaginatedList, Client} from "../api/api";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {getTitles} from "../store/actions-creators/titles";
import {useActions} from "../hooks/useActions";

const apiClient = new Client('https://localhost:5001');

const AnimeList: FC = (): ReactElement => {
    const {titles, loading, error} = useTypedSelector(state => state.titles)
    const {getTitles} = useActions()

    useEffect(() => {
        getTitles(1, 10)
    }, []);

    if (loading) {
        return <h1>Идет загрузка...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div>
            {titles?.map((title) => (
                <div key={title.id}>
                    <div style={{marginTop: 10}}>{title.russian}</div>
                    <img src={"https://shikimori.one/" + title.image?.preview}/>
                    <div>{title.score}</div>
                </div>
                ))}
        </div>
    );
};

export default AnimeList;