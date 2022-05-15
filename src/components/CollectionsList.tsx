import React, { FC, ReactElement, useEffect, useState } from 'react';
import { BriefCollectionVM, Client } from '../api/api';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

const apiClient = new Client('https://localhost:5001');

const CollectionsList: FC = (): ReactElement => {
    const [collections, setCollections] = useState<BriefCollectionVM[] | undefined>()

    async function getCollections() {
        const paginatedList = await apiClient.animeCollections();
        console.log(paginatedList.items);
        setCollections(paginatedList.items);
    }

    useEffect(() => {
        getCollections();
    }, [])

    return (
        <div>
            {collections?.map(collection =>
                <div key={collection.id}>
                    {collection.name}
                </div>
            )}
        </div>
    );
};

export default CollectionsList;