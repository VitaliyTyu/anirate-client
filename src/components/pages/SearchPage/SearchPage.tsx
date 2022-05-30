import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { BriefCollectionVM, BriefTitleVM } from '../../../api/api';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import AnimeList from '../../UI/Anime/AnimeList/AnimeList';
import CollectionsList from '../../UI/Collections/CollectionList/CollectionsList';
import SimpleCollectionList from '../../UI/Collections/SimpleCollectionList/SimpleCollectionList';
import css from "./SearchPage.module.css"



const SearchPage: FC = (): ReactElement => {
    const titlesState = useTypedSelector(state => state.titles)
    const collectionsState = useTypedSelector(state => state.collections)

    const { searchTitles, setTitlesPage, searchCollections, setCollectionsPage } = useActions()
    const navigate = useNavigate()
    const { searchString } = useParams()
    const [isAnime, setIsAnime] = useState(true)

    const animeFunctionOnClick = (item: BriefTitleVM) => {
        navigate(`/animes/${item?.id}`)
    }

    const collectionFunctionOnClick = (item: BriefCollectionVM) => {
        navigate(`/collections/${item?.id}`)
    }

    useEffect(() => {
        searchTitles(searchString ?? "", titlesState.page, 20)
    }, [titlesState.page]);


    useEffect(() => {
        setTitlesPage(1);
        setCollectionsPage(1);
        searchTitles(searchString ?? "", 1, 20)
        searchCollections(searchString ?? "", 1, 10)
    }, [searchString]);

    const handleAnimesPageClick = (selectedItem: { selected: number; }) => {
        setTitlesPage(selectedItem.selected + 1)
    }

    const handleCollectionsPageClick = (selectedItem: { selected: number; }) => {
        setCollectionsPage(selectedItem.selected + 1)
    }

    if (titlesState.error) {
        return <h1>{titlesState.error}</h1>
    }


    return (
        isAnime
            ?
            <div>
                <Button className={css.button}
                    variant="outline-dark" size="lg"
                    onClick={() => setIsAnime(false)}>
                    Перейти к коллекциям
                </Button>
                <div className="row m-2">
                    <AnimeList paginatedList={titlesState.paginatedList} clickFunction={animeFunctionOnClick} />
                </div>
                <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    breakLabel={"..."}
                    pageCount={titlesState.paginatedList?.totalPages ?? 0}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handleAnimesPageClick}
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
            :
            <div>
                <Button className={css.button}
                    variant="outline-dark" size="lg"
                    onClick={() => setIsAnime(true)}>
                    Перейти к аниме
                </Button>
                <div className="row m-2">
                    <SimpleCollectionList
                        paginatedList={collectionsState.paginatedList}
                        clickFunction={collectionFunctionOnClick}
                    />
                </div>
                <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    breakLabel={"..."}
                    pageCount={collectionsState.paginatedList?.totalPages ?? 0}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handleCollectionsPageClick}
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

export default SearchPage;