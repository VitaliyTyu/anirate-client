import React, { FC, ReactElement, useEffect, useState } from 'react';
import { BriefCollectionVM, BriefTitleVM, Client, TitleDetailsVM } from "../api/api";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { getTitleDetails } from "../store/actions-creators/titleDetails";
import { useActions } from "../hooks/useActions";
import { useNavigate } from 'react-router-dom';

interface CollectionItemProps {
    clickFunction: () => void;
    collection: BriefCollectionVM | undefined;
    children?: React.ReactChild | React.ReactNode;
}

const CollectionItem: FC<CollectionItemProps> = (props): ReactElement => {
    return (
        <div
            onClick={() => props.clickFunction()}
            key={props.collection?.id}
        >
            <div>{props.collection?.name}</div>
            <div><img src={"https://shikimori.one/" + props.collection?.image?.preview} /></div>
        </div>
    );
};

export default CollectionItem;