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
    const [imgPath, setImgPath] = useState("https://dummyimage.com/150x250/b8b6b8/666669&text=Коллекция");

    useEffect(() => {
        if (props.collection?.image == undefined) {
            setImgPath("https://dummyimage.com/150x250/b8b6b8/666669&text=Коллекция")
        }
        else {
            setImgPath("https://shikimori.one/" + props.collection?.image?.preview)
        }
    }, [])

    return (
        <div
            onClick={() => props.clickFunction()}
            key={props.collection?.id}
        >
            <div>{props.collection?.name}</div>
            {/* <div><img src={imgPath} /></div> */}
            <div><img src={"https://shikimori.one/" + props.collection?.image?.preview} /></div>

        </div>
    );
};

export default CollectionItem;