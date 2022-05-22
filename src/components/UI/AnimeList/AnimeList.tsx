import React, { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { BriefTitleVM, BriefTitleVMPaginatedList } from "../../../api/api";
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

    return (
        <div>

            <div >
                <CardGroup className={css.animeList}>
                    {props.paginatedList?.items?.map((title) => (
                        <AnimeItem
                            key={title.id}
                            title={title}
                            clickFunction={() => props.clickFunction(title)}
                        />
                    ))}
                </CardGroup>
            </div>

        </div>
    );
};

export default AnimeList;