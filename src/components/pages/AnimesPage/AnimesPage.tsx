
import { FOCUSABLE_SELECTOR } from "@testing-library/user-event/dist/utils";
import { useMemo, useEffect, useRef, useState, FC, ReactElement, useCallback } from "react";
import { Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { BriefTitleVM } from "../../../api/api";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import AnimeList from "../../UI/Anime/AnimeList/AnimeList";
import css from "./AnimesPage.module.css"

const AnimesPage: FC = (): ReactElement => {
    const { paginatedList, error, page, loading } = useTypedSelector(state => state.titles)
    const { getTitles, setTitlesPage, searchTitles } = useActions()
    const navigate = useNavigate()
    const [searchString, setSearchString] = useState("")
    const [isSearch, setIsSearch] = useState<boolean>(false)

    const functionOnClick = (item: BriefTitleVM) => {
        navigate(`/animes/${item?.id}`)
    }

    useEffect(() => {
        setSearchString("")
        setIsSearch(false)
        setTitlesPage(1);
        getTitles(1, 20)
    }, []);

    useEffect(() => {
        if (isSearch) {
            searchTitles(searchString ?? "", page, 20)
        } else {
            getTitles(page, 20)
        }
    }, [page]);

    const handlePageClick = (selectedItem: { selected: number; }) => {
        setTitlesPage(selectedItem.selected + 1)
    }

    const handleValidation = () => {
        let searchStringIsValid = true;

        if (searchString.length < 1) {
            searchStringIsValid = false;
        }

        return searchStringIsValid;
    };

    const search = () => {
        if (handleValidation()) {
            searchTitles(searchString ?? "", 1, 20)
            setIsSearch(true)
        }
    }

    const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode == 13 && handleValidation()) {
            e.preventDefault();
            searchTitles(searchString ?? "", 1, 20)
            setIsSearch(true)
        }
    }


    if (error) {
        return <h1>{error}</h1>
    }


    return (
        <div>
            <h1 className={css.first}>Аниме</h1>
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