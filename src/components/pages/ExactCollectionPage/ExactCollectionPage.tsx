import React, { useEffect, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { BriefCollectionVM, BriefTitleVM } from '../../../api/api';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import AnimeList from '../../UI/AnimeList/AnimeList';
import AddAnimesToCollectionModal from '../../UI/Modal/AddAnimesToCollectionModal/AddAnimesToCollectionModal';
import css from './ExactCollectionPage.module.css'

const ExactCollectionPage = () => {
    const collectionState = useTypedSelector(state => state.collectionDetails)
    const titlesState = useTypedSelector(state => state.titles)
    const { getCollectionDetails, setTitlesInCollectionPage, authCheck } = useActions()
    const params = useParams()
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
        authCheck()
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
                <div className={css.collection}>
                    <div className={css.collectionPart}>
                        <div className={css.collectionInfo}>
                            <h1>{collectionState.collectionDetails?.name}</h1>
                            <div>Аниме в коллекции: {collectionState.collectionDetails?.animeTitles?.items?.length}</div>
                            <div className={css.description}>
                                <div>Описание: <br/>
                                {collectionState.collectionDetails?.userComment}</div>
                                Кто приходит на ум, когда речь заходит о тайных агентах? Конечно же, невероятный Джеймс Бонд, который постоянно подвергает жизнь опасности, выполняя секретные миссии. О таком харизматичном и смелом мужчине мечтают многие дамы, так что Агент 007 купается в лучах женского внимания.
Герой этой истории, Лойд Форджер, является «Джеймсом Бондом» своего времени. Погони, шпионаж, перестрелки, тайные миссии — всё это является неотъемлемой частью его жизни. Закончив одно задание, он тут же принимается за другое — усталость ему неведома. Однако на этот раз миссия оказывается немного необычной: он должен сохранить мир между двумя странами, а для этого ему предстоит обзавестись фиктивной семьёй. Роль «роковой красотки из Бондианы», и по совместительству жены Лойда, достаётся Йор Форджер — профессиональной наёмной убийце с кодовым именем Тернистая Принцесса. Для полноты картины осталось обзавестись ещё и ребёнком, и эспер Аня Форджер только рада заполучить себе крутых новых родителей.

Теперь новой семье предстоит не только выполнить секретное задание, не раскрыв себя, но и понять, что семья — это гораздо больше, чем просто кровные родственники.
                            </div>
                        </div>
                    </div>
                    <div className={css.collectionModal}>
                        <AddAnimesToCollectionModal collectionId={collectionState.collectionDetails?.id} />
                    </div>
                </div>
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