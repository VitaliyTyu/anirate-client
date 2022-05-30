import React, { FC, ReactElement, useEffect, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
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
    const navigate = useNavigate()

    const functionOnClick = (item: BriefCollectionVM) => {
        navigate(`/collections/${item?.id}`)
    }

    const handlePageClick = (selectedItem: { selected: number; }) => {
        setCollectionsPage(selectedItem.selected + 1)
    }


    useEffect(() => {
        authCheck()
        setCollectionsPage(1)
        getCollections(1, 10)
    }, []);


    useEffect(() => {
        getCollections(page, 10)
    }, [page]);


    if (error) {
        return <h1>{error.message}</h1>
    }


    return (
        <div>
            <div className="row m-2">
                <CreateCollectionModal page={page} size={10} />
                <CollectionsList paginatedList={paginatedList} clickFunction={functionOnClick} />
            </div>

            <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                breakLabel={"..."}
                pageCount={paginatedList?.totalPages ?? 0}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>
    );
};

export default CollectionsPage;