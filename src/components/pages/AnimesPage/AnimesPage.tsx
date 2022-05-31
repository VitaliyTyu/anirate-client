
import { useMemo, useEffect, useRef, useState, FC, ReactElement } from "react";
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
    const makePages = useMemo(() => makePagesArr(), [paginatedList?.totalPages])
    const navigate = useNavigate()
    // const lastElement = useRef<HTMLHeadingElement>(null)
    // const [titles, setTitles] = useState<BriefTitleVM[]>([])

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
    // useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    //     setPage(page + 1);
    // })

    // useEffect(() => {
    //     setTitles([...titles, ...paginatedList?.items ?? []])
    // }, [paginatedList]);

    useEffect(() => {
        getTitles(page, 25)
    }, [page]);


    useEffect(() => {
        setTitlesPage(1);
        getTitles(1, 25)
    }, []);


    if (error) {
        return <h1>{error}</h1>
    }


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
            {/* <div ref={lastElement} style={{ height: 20, background: "red" }}></div> */}
        </div>
    );
};

export default AnimesPage;