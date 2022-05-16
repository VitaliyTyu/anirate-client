import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import CollectionsList from '../../CollectionsList';

const CollectionsPage = () => {
    const { paginatedList, loading, error, page } = useTypedSelector(state => state.collections)
    const { getCollections, setCollectionsPage, } = useActions()
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
        getCollections(page, 2)
    }, [page]);


    if (loading) {
        return <h1>Идет загрузка...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div>
            <div style={{ display: "flex" }}>
                {pages.map(p =>
                    <div
                        onClick={() => setCollectionsPage(p)}
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
            <CollectionsList paginatedList={paginatedList} />
        </div>
    );
};

export default CollectionsPage;