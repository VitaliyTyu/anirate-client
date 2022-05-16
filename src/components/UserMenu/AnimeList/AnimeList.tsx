import React, { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { BriefTitleVM, BriefTitleVMPaginatedList, Client } from "../../../api/api";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { getTitles } from "../../../store/actions-creators/titles";
import { useActions } from "../../../hooks/useActions";
import AnimeTitle from '../AnimeTitle/AnimeTitle';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';



const AnimeList: FC = (): ReactElement => {
    const { paginatedList, loading, error, page } = useTypedSelector(state => state.titles)
    const { getTitles, setTitlesPage, setCurrentTitleDetails } = useActions()
    const pages: number[] = [];
    const makePages = useMemo(() => makePagesArr(), [paginatedList])
    const navigate = useNavigate()

    function makePagesArr() {
        //@ts-ignore
        for (let i = 0; i < paginatedList?.totalPages; i++) {
            pages.push(i + 1)
        }
    }

    useEffect(() => {
        getTitles(page, 10)
    }, [page]);


    if (loading) {
        return <h1>Идет загрузка...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }


    return (
        <div>            
            <div style={
                {
                    display: "flex",
                    flexWrap: "wrap",
                    alignContent: "space-evenly",
                    justifyContent: "space-between",
                }}>
                {paginatedList?.items?.map((title) => (
                    <AnimeTitle title={title} clickFunction={() => navigate(`/animes/${title?.id}`)} />
                ))}
            </div>
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
        </div>
    );
};

export default AnimeList;