import React, { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { BriefCollectionVM, BriefTitleVM, BriefTitleVMPaginatedList, Client } from "../../../api/api";
import { useNavigate } from 'react-router-dom';
import AnimeItem from '../AnimeItem/AnimeItem';
import css from './AnimeList.module.css'
import { CardGroup } from 'react-bootstrap';


interface AnimeListProps {
    clickFunction: (item: BriefTitleVM) => void;
    paginatedList: BriefTitleVMPaginatedList | undefined;
    children?: React.ReactChild | React.ReactNode;
}

const AnimeList: FC<AnimeListProps> = (props): ReactElement => {
    const navigate = useNavigate()

    return (
        <div>
            
            <div >
                <CardGroup className={css.animeList}> 
                {props.paginatedList?.items?.map((title) => (
                    <AnimeItem title={title} clickFunction={() => props.clickFunction(title)} />
                ))}
                 </CardGroup>
            </div>
            
        </div>
    );
};

export default AnimeList;