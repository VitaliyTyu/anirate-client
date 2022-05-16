import React, { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { BriefTitleVM, BriefTitleVMPaginatedList, Client } from "../api/api";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { getTitles } from "../store/actions-creators/titles";
import { useActions } from "../hooks/useActions";
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimeItem from './AnimeItem';

interface AnimeListProps {
    // clickFunction: () => void;
    paginatedList: BriefTitleVMPaginatedList | undefined;
    children?: React.ReactChild | React.ReactNode;
}

const AnimeList: FC<AnimeListProps> = (props): ReactElement => {
    const navigate = useNavigate()

    return (
        <div>
            <div style={
                {
                    display: "flex",
                    flexWrap: "wrap",
                    alignContent: "space-between",
                    justifyContent: "space-between",
                }}>
                {props.paginatedList?.items?.map((title) => (
                    <AnimeItem title={title} clickFunction={() => navigate(`/animes/${title?.id}`)} />
                    // <AnimeItem title={title} clickFunction={props.clickFunction} />
                ))}
            </div>
        </div>
    );
};

export default AnimeList;