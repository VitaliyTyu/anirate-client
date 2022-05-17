import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BriefTitleVM } from '../../../api/api';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import AnimeList from '../../UI/AnimeList/AnimeList';
import css from "./AnimesPage.module.css"

const AnimesPage = () => {
    const { paginatedList, loading, error, page } = useTypedSelector(state => state.titles)
    const { getTitles, setTitlesPage } = useActions()
    const pages: number[] = [];
    const makePages = useMemo(() => makePagesArr(), [paginatedList?.totalPages])
    const navigate = useNavigate()

    const functionOnClick = (item: BriefTitleVM) => {
        navigate(`/animes/${item?.id}`)
    }

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
        getTitles(page, 20)
        console.log("get");
    }, [page]);


    if (error) {
        return <h1>{error}</h1>
    }

    // if (loading) {
    //     return <h1>Идет загрузка...</h1>
    // }

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
            <AnimeList paginatedList={paginatedList} clickFunction={functionOnClick} />
        </div>
    );
};

export default AnimesPage;