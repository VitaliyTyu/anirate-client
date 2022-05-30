import React, { FC, ReactElement, useEffect, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { BriefTitleVM } from '../../../api/api';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import AnimeList from '../../UI/Anime/AnimeList/AnimeList';
import css from "./SearchPage.module.css"



const SearchPage: FC = (): ReactElement => {
    const { paginatedList, error, page, loading } = useTypedSelector(state => state.titles)
    const { searchTitles, setTitlesPage } = useActions()
    const navigate = useNavigate()
    const { searchString } = useParams()

    const functionOnClick = (item: BriefTitleVM) => {
        navigate(`/animes/${item?.id}`)
    }

    useEffect(() => {
        searchTitles(searchString ?? "", page, 20)
    }, [page]);


    useEffect(() => {
        console.log(searchString);
        setTitlesPage(1);
        searchTitles(searchString ?? "", 1, 20)
    }, [searchString]);

    const handlePageClick = (selectedItem: { selected: number; }) => {
        setTitlesPage(selectedItem.selected + 1)
    }

    if (error) {
        return <h1>{error}</h1>
    }


    return (
        <div>
            <div className="row m-2">
                <AnimeList paginatedList={paginatedList} clickFunction={functionOnClick} />
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

export default SearchPage;