import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BriefCollectionVM, BriefCollectionVMPaginatedList, Client } from '../../../api/api';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import CollectionItem from '../CollectionItem/CollectionItem';
import css from "./CollectionList.module.css"


interface CollectionsListProps {
    paginatedList: BriefCollectionVMPaginatedList | undefined
    children?: React.ReactChild | React.ReactNode;
}

const CollectionsList: FC<CollectionsListProps> = (props): ReactElement => {
    const navigate = useNavigate()

    return (
        <div className={css.collectionList}>
            {props.paginatedList?.items?.map((collection => (
                <CollectionItem
                    key={collection?.id}
                    clickFunction={() => navigate(`/collections/${collection?.id}`)}
                    collection={collection}
                />
            )))}
        </div>
    );
};

export default CollectionsList;