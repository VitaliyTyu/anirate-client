import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useNavigate, useParams } from 'react-router-dom';
import { BriefCollectionVM } from '../../../api/api';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import CollectionsList from '../../UI/Collections/CollectionList/CollectionsList';
import CreateCollectionModal from '../../UI/Modal/CreateCollectionModal/CreateCollectionModal';
import css from "./CollectionsSearchPage.module.css"

const CollectionsSearchPage: FC = (): ReactElement => {
    const params = useParams()
    const { paginatedList, error, page } = useTypedSelector(state => state.collections)
    const { setCollectionsPage, authCheck, searchCollections } = useActions()
    const navigate = useNavigate()
    const [searchString, setSearchString] = useState("")

    const functionOnClick = (item: BriefCollectionVM) => {
        navigate(`/collections/${item?.id}`)
    }

    const handlePageClick = (selectedItem: { selected: number; }) => {
        setCollectionsPage(selectedItem.selected + 1)
    }

    useEffect(() => {
        authCheck()
        setSearchString(params.searchString ?? "")
        setCollectionsPage(1)
        searchCollections(params.searchString ?? "", 1, 10)
    }, []);

    useEffect(() => {
        if (searchString === "") return
        searchCollections(searchString, page, 10)
    }, [page]);

    const handleValidation = () => {
        let searchStringIsValid = true;

        if (searchString.length < 1) {
            searchStringIsValid = false;
        }

        return searchStringIsValid;
    };

    const search = () => {
        if (handleValidation()) {
            searchCollections(searchString, 1, 10)
        }
    }

    const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode == 13 && handleValidation()) {
            e.preventDefault();
            searchCollections(searchString, 1, 10)
        }
    }

    if (error) {
        return <h1>{error.message}</h1>
    }

    return (
        <div>
            <h1 className={css.first}>Коллекции</h1>
            <form className={css.formSearch}>
                <input className="form-control ms-5"
                    placeholder="Поиск"
                    aria-label="Search"
                    onChange={(event) => setSearchString(event.target.value)}
                    onKeyDown={(event) => onEnterPress(event)}
                />
                <Button
                    style={{ marginRight: 25 }}
                    variant="outline-dark"
                    className="ms-1"
                    onClick={search}
                >
                    Поиск
                </Button>

            </form>
            <div className="row m-2">
                <CreateCollectionModal
                    searchString={searchString}
                    page={page}
                    size={10} />
                <CollectionsList
                    searchString={searchString}
                    paginatedList={paginatedList}
                    clickFunction={functionOnClick}
                />
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

export default CollectionsSearchPage;