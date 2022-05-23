import React, { FC, ReactElement, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiException, BriefCollectionVM, Client, DeleteCollectionsDto } from '../../../api/api';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import CollectionsList from '../../UI/Collections/CollectionList/CollectionsList';
import CreateCollectionModal from '../../UI/Modal/CreateCollectionModal/CreateCollectionModal';
import css from "./CollectionsPage.module.css"


const CollectionsPage: FC = (): ReactElement => {
    const { isAuth } = useTypedSelector(state => state.auth)
    const { paginatedList, error, page } = useTypedSelector(state => state.collections)
    const { getCollections, setCollectionsPage, logout, authCheck } = useActions()
    const pages: number[] = [];
    const makePages = useMemo(() => makePagesArr(), [paginatedList?.totalPages])
    const navigate = useNavigate()

    const functionOnClick = (item: BriefCollectionVM) => {
        navigate(`/collections/${item?.id}`)
    }

    function makePagesArr() {
        let arr: number[] = []
        let len = paginatedList?.totalPages ?? 0
        for (let i = 0; i < len; i++) {
            arr.push(i + 1)
        }

        return arr;
    }

    useEffect(() => {
        authCheck()
        setCollectionsPage(1)
        getCollections(1, 20)
    }, []);


    useEffect(() => {
        getCollections(page, 20)
    }, [page]);


    if (error) {
        return <h1>{error.message}</h1>
    }


    return (
        <div className={css.collectionsPage}>
            <CreateCollectionModal page={page} size={20} />
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
            <CollectionsList paginatedList={paginatedList} clickFunction={functionOnClick} />
        </div>
    );
};

export default CollectionsPage;