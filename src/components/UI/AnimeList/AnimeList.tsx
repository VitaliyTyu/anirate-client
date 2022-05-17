import React, { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { BriefCollectionVM, BriefTitleVM, BriefTitleVMPaginatedList, Client } from "../../../api/api";
import { useNavigate } from 'react-router-dom';
import AnimeItem from '../AnimeItem/AnimeItem';
import css from './AnimeList.module.css'


interface AnimeListProps {
    clickFunction: (item: BriefTitleVM) => void;
    paginatedList: BriefTitleVMPaginatedList | undefined;
    children?: React.ReactChild | React.ReactNode;
}

const AnimeList: FC<AnimeListProps> = (props): ReactElement => {

    return (
        <div>
            <div className={css.animeList}>
                {props.paginatedList?.items?.map((title) => (
                    <AnimeItem title={title} clickFunction={() => props.clickFunction(title)} />
                ))}
            </div>
        </div>
    );
};

export default AnimeList;