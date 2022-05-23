import React, { FC, ReactElement, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { BriefTitleVM } from '../../../api/api';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import AnimeList from '../../UI/Anime/AnimeList/AnimeList';
import css from "./SearchPage.module.css"



const SearchPage: FC = (): ReactElement => {
    const { paginatedList, error, page, loading } = useTypedSelector(state => state.titles)
    const { searchTitles, setTitlesPage } = useActions()
    const pages: number[] = [];
    const makePages = useMemo(() => makePagesArr(), [paginatedList?.totalPages])
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    // searchParams.get("searchString")
    // const searchString = searchParams.get("searchString");
    const { searchString } = useParams()

    const functionOnClick = (item: BriefTitleVM) => {
        navigate(`/animes/${item?.id}`)
    }

    function makePagesArr() {
        let arr: number[] = []
        let len = paginatedList?.totalPages ?? 1
        for (let i = 0; i < len; i++) {
            arr.push(i + 1)
        }

        return arr;
    }

    useEffect(() => {
        searchTitles(searchString ?? "", page, 25)
    }, [page]);


    useEffect(() => {
        console.log(searchString);
        setTitlesPage(1);
        searchTitles(searchString ?? "", 1, 25)
    }, [searchString]);


    if (error) {
        return <h1>{error}</h1>
    }

    // return <h1>Search page</h1>

    return (
        <div className={css.animesPage}>
            <div style={{ display: "flex" }}>
                {makePages.map(p =>
                    <div
                        onClick={() => setTitlesPage(p)}
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
            <div className={css.animeList}>
                <AnimeList paginatedList={paginatedList} clickFunction={functionOnClick} />
            </div>
        </div>
    );
};

export default SearchPage;