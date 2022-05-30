
import { useMemo, useEffect, useRef, useState, FC, ReactElement, useCallback } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { BriefTitleVM } from "../../../api/api";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import AnimeList from "../../UI/Anime/AnimeList/AnimeList";
import css from "./AnimesPage.module.css"

const AnimesPage: FC = (): ReactElement => {
    const { paginatedList, error, page, loading } = useTypedSelector(state => state.titles)
    const { getTitles, setTitlesPage } = useActions()
    const pages: number[] = [];
    const navigate = useNavigate()
    const [elems, setElems] = useState<BriefTitleVM[]>([]);
    const lastElement = useRef<HTMLHeadingElement>(null)
    const observer = useRef<IntersectionObserver | null>(null);

    const functionOnClick = (item: BriefTitleVM) => {
        navigate(`/animes/${item?.id}`)
    }


    useEffect(() => {
        getTitles(page, 20)
    }, [page]);


    useEffect(() => {
        setTitlesPage(1);
        getTitles(1, 20)
    }, []);

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

export default AnimesPage;