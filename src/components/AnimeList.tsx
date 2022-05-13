import React, { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { BriefTitleVM, BriefTitleVMPaginatedList, Client } from "../api/api";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { getTitles } from "../store/actions-creators/titles";
import { useActions } from "../hooks/useActions";

const apiClient = new Client('https://localhost:5001');

const AnimeList: FC = (): ReactElement => {
    const { paginatedList, loading, error, page } = useTypedSelector(state => state.titles)
    const { getTitles, setTitlesPage, setCurrentTitleDetails } = useActions()
    const pages: number[] = [];

    useEffect(() => {
        getTitles(page, 10)
    }, [page]);



    if (loading) {
        return <h1>Идет загрузка...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    //@ts-ignore
    for (let i = 0; i < paginatedList?.totalPages; i++) {
        pages.push(i + 1)
    }


    return (
        <div>
            <div style={{ display: "flex" }}>
                {pages.map(p =>
                    <div
                        onClick={() => setTitlesPage(p)}
                        style={{
                            border: p === page ? "2px solid green" : "1px solid gray",
                            padding: 10,
                            margin: 10,
                        }}
                    >
                        {p}
                    </div>
                )}
            </div>
            <div style={{ display: "flex" }}>
                {paginatedList?.items?.map((title) => (
                    <div
                        key={title.id}
                        onClick={() => setCurrentTitleDetails(title.id)}
                    >
                        <div style={{ marginTop: 10 }}>{title.russian}</div>
                        <img src={"https://shikimori.one/" + title.image?.preview} />
                        <div>{title.score}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnimeList;