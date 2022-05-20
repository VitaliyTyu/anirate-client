import React, { useEffect, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { BriefCollectionVM, BriefTitleVM } from '../../../api/api';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import AnimeList from '../../UI/AnimeList/AnimeList';
import AddAnimesToCollectionModal from '../../UI/Modal/AddAnimesToCollectionModal';
import css from './ExactCollectionPage.module.css'

const ExactCollectionPage = () => {
    const collectionState = useTypedSelector(state => state.collectionDetails)
    const titlesState = useTypedSelector(state => state.titles)
    const { getCollectionDetails, setTitlesInCollectionPage } = useActions()
    const params = useParams()
    const [imgPath, setImgPath] = useState("https://dummyimage.com/150x250/b8b6b8/666669&text=Коллекция");
    const navigate = useNavigate()
    const makePages = useMemo(() => makePagesArr(), [collectionState.collectionDetails?.animeTitles?.totalPages])


    const functionOnClick = (item: BriefCollectionVM) => {
        navigate(`/animes/${item?.id}`)
    }

    function makePagesArr() {
        let arr: number[] = []
        let totalPages = collectionState.collectionDetails?.animeTitles?.totalPages ?? 1
        for (let i = 0; i < totalPages; i++) {
            arr.push(i + 1)
        }

        return arr;
    }

    useEffect(() => {
        if (collectionState.collectionDetails?.image == undefined) {
            setImgPath("https://dummyimage.com/150x250/b8b6b8/666669&text=Коллекция")
        }
        else {
            setImgPath("https://shikimori.one/" + collectionState.collectionDetails?.image?.preview)
        }
    }, [collectionState?.collectionDetails?.image])


    useEffect(() => {
        getCollectionDetails(params.id, 1, 10)
        setTitlesInCollectionPage(1);
    }, [])


    useEffect(() => {
        console.log(collectionState.page);
        getCollectionDetails(params.id, collectionState.page, 10)
    }, [collectionState.page]);


    if (collectionState.error) {
        return <h1>{collectionState.error}</h1>
    }


    return (
        <div className={css.exactCollectionPage}>
            <div className={css.exactCollection}>
                <img src={imgPath} />
                <div>{collectionState.collectionDetails?.name}</div>
                <AddAnimesToCollectionModal collectionId={collectionState.collectionDetails?.id} />
            </div>
            <div className={css.animes}>
                <h1>Аниме в этой коллекции:</h1>
                <div style={{ display: "flex" }}>
                    {makePages.map(p =>
                        <div
                            onClick={() => setTitlesInCollectionPage(p)}
                            style={{
                                border: p === collectionState.page ? "2px solid green" : "1px solid gray",
                                padding: 10,
                                margin: 10,
                            }}
                        >
                            {p}
                        </div>
                    )}
                </div>

                <AnimeList clickFunction={functionOnClick} paginatedList={collectionState.collectionDetails?.animeTitles} />
            </div>
        </div>
    );
};

export default ExactCollectionPage;