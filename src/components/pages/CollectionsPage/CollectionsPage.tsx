import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import CollectionsList from '../../UI/CollectionList/CollectionsList';
import CreateCollectionModal from '../../UI/Modal/CreateCollectionModal';
import css from "./CollectionsPage.module.css"


const CollectionsPage = () => {
    const { paginatedList, loading, error, page } = useTypedSelector(state => state.collections)
    const { getCollections, setCollectionsPage, } = useActions()
    const pages: number[] = [];
    const makePages = useMemo(() => makePagesArr(), [paginatedList?.totalPages])
    const navigate = useNavigate()

    function makePagesArr() {
        let arr: number[] = []
        let list = paginatedList?.totalPages ?? 1
        if (paginatedList !== undefined) {
            for (let i = 0; i < list; i++) {
                arr.push(i + 1)
            }
        }

        return arr;
    }

    useEffect(() => {
        getCollections(page, 10)
    }, [page]);


    // if (loading) {
    //     return <h1>Идет загрузка...</h1>
    // }

    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div className={css.collectionsPage}>
            <CreateCollectionModal page={page} size={10} />
            <div style={{ display: "flex" }}>
                {makePages.map(p =>
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