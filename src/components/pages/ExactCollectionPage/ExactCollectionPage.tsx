
import { useMemo, useEffect, ReactElement, FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BriefCollectionVM } from '../../../api/api';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import AnimeInCollectionList from '../../UI/Anime/AnimeInCollectionList/AnimeInCollectionList';
import AnimeList from '../../UI/Anime/AnimeList/AnimeList';
import AddAnimesToCollectionModal from '../../UI/Modal/AddAnimesToCollectionModal/AddAnimesToCollectionModal';
import css from './ExactCollectionPage.module.css'

const ExactCollectionPage: FC = (): ReactElement => {
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
        getCollectionDetails(params.id, 1, 25)
        setTitlesInCollectionPage(1);
    }, [])


    useEffect(() => {
        console.log(collectionState.page);
        getCollectionDetails(params.id, collectionState.page, 25)
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
                                <div>Описание: <br />
                                    {collectionState.collectionDetails?.userComment}
                                </div>
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

                <AnimeInCollectionList
                    clickFunction={functionOnClick}
                    paginatedList={collectionState.collectionDetails?.animeTitles}
                    collectionId={collectionState.collectionDetails?.id ?? ""}
                />
            </div>
        </div>
    );
};

export default ExactCollectionPage;