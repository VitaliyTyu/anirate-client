
import { useMemo, useEffect, ReactElement, FC } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useParams, useNavigate } from 'react-router-dom';
import { BriefCollectionVM, Client, DeleteCollectionsDto } from '../../../api/api';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import AnimeInCollectionList from '../../UI/Anime/AnimeInCollectionList/AnimeInCollectionList';
import AnimeList from '../../UI/Anime/AnimeList/AnimeList';
import AddAnimesToCollectionModal from '../../UI/Modal/AddAnimesToCollectionModal/AddAnimesToCollectionModal';
import InsideChangeCollectionModal from '../../UI/Modal/InsideChangeCollectionModal/InsideChangeCollectionModal';


import css from './ExactCollectionPage.module.css'

const apiClient = new Client('https://localhost:5001');

const ExactCollectionPage: FC = (): ReactElement => {
    const collectionState = useTypedSelector(state => state.collectionDetails)
    const { getCollectionDetails, setTitlesInCollectionPage, authCheck } = useActions()
    const params = useParams()
    const navigate = useNavigate()

    const functionOnClick = (item: BriefCollectionVM) => {
        navigate(`/animes/${item?.id}`)
    }

    const handlePageClick = (selectedItem: { selected: number; }) => {
        setTitlesInCollectionPage(selectedItem.selected + 1)
    }

    const deleteCollection = async () => {
        let deleteCollectionsDto: DeleteCollectionsDto = {
            animeCollectionsIds: [collectionState.collectionDetails?.id ?? ""],
        }
        await apiClient.deleteCollections(deleteCollectionsDto)
        navigate("/collections")
    }

    useEffect(() => {
        authCheck()
        getCollectionDetails(params.id, 1, 20)
        setTitlesInCollectionPage(1);
    }, [])


    useEffect(() => {
        getCollectionDetails(params.id, collectionState.page, 20)
    }, [collectionState.page]);


    if (collectionState.error) {
        return <h1>{collectionState.error}</h1>
    }


    return (
        <div className={css.exactCollectionPage}>
            <div className={css.collection}>
                <div className={css.collectionPart}>
                    <div className={css.collectionInfo}>
                        <h1>{collectionState.collectionDetails?.name}</h1>
                        {/* <div>Аниме в коллекции: {collectionState.collectionDetails?.animeTitles?.items?.length}</div> */}
                        <div className={css.description}>
                            <div>Описание: <br />
                                {collectionState.collectionDetails?.userComment}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={css.buttonPlace}>

                    <AddAnimesToCollectionModal
                        page={collectionState.page}
                        size={10}
                        collectionId={collectionState.collectionDetails?.id}
                    />

                    <InsideChangeCollectionModal
                        collection={collectionState.collectionDetails}
                        page={collectionState.page}
                        size={20}
                    />

                    <Button className={css.button}
                        variant="outline-dark" size="lg"
                        onClick={() => deleteCollection()}>
                        Удалить коллекцию
                    </Button>

                </div>

            </div>
            <div>
                <div className={css.animes}>
                    <h1>Аниме в этой коллекции:</h1>
                    <AnimeInCollectionList
                        clickFunction={functionOnClick}
                        paginatedList={collectionState.collectionDetails?.animeTitles}
                        collectionId={collectionState.collectionDetails?.id ?? ""}
                    />
                </div>


                <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    breakLabel={"..."}
                    pageCount={collectionState.collectionDetails?.animeTitles?.totalPages ?? 0}
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
        </div>
    );
};

export default ExactCollectionPage;