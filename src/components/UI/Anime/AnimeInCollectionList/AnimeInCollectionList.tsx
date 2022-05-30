import { FC, ReactElement } from "react";
import { CardGroup } from "react-bootstrap";
import { BriefTitleVM, BriefTitleVMPaginatedList } from "../../../../api/api";
import React from 'react';
import css from "./AnimeInCollectionList.module.css"
import AnimeInCollectionItem from "../AnimeInCollectionItem/AnimeInCollectionItem";

interface AnimeInCollectionListProps {
    clickFunction: (item: BriefTitleVM) => void;
    paginatedList: BriefTitleVMPaginatedList | undefined;
    children?: React.ReactChild | React.ReactNode;
    collectionId: string;
}

const AnimeInCollectionList: FC<AnimeInCollectionListProps> = (props): ReactElement => {
    return (
        <div>
            <div >
                <CardGroup className={css.animeList}>
                    {props.paginatedList?.items?.map((title) => (
                        <AnimeInCollectionItem
                            key={title.id}
                            title={title}
                            clickFunction={() => props.clickFunction(title)}
                            page={props.paginatedList?.pageNumber ?? 1}
                            size={20}
                            collectionId={props.collectionId}
                        />
                    ))}
                </CardGroup>
            </div>
        </div>
    );
};

export default AnimeInCollectionList;