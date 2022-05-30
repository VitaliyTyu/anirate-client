import React, { FC, useEffect, useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { AddTitlesInCollectionsDto, BriefCollectionVM, BriefTitleVM, Client } from '../../../../api/api';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import AnimeList from '../../Anime/AnimeList/AnimeList';
import CollectionsList from '../../Collections/CollectionList/CollectionsList';
import SimpleCollectionList from '../../Collections/SimpleCollectionList/SimpleCollectionList';
import css from './AddAnimesToCollectionModal.module.css'

const apiClient = new Client('https://localhost:5001');

interface AddAnimeToCollectionsModalProps {
    animeId: string | undefined;
    children?: React.ReactChild | React.ReactNode;
}

const AddAnimeToCollectionsModal: FC<AddAnimeToCollectionsModalProps> = (props) => {
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const collectionsState = useTypedSelector(state => state.collections)
    const { getCollections, setCollectionsPage, authCheck } = useActions()
    const [collectionsIds, setCollectionsIds] = useState<string[]>([])

    const handleClose = () => {
        setShow(false)
        setCollectionsIds([])
    }

    const functionOnClick = (item: BriefCollectionVM) => {
        if (item.id !== undefined) {
            setCollectionsIds([...collectionsIds, item.id])
        }
    }

    useEffect(() => {
        getCollections(1, 10)
        setCollectionsPage(1)
    }, [])


    useEffect(() => {
        getCollections(collectionsState.page, 10)
    }, [collectionsState.page]);

    const addCollections = async () => {
        authCheck()
        let addTitlesInCollectionsDto: AddTitlesInCollectionsDto = {
            collectionsIds,
            animeTitlesIds: [props.animeId ?? ""],
        }
        await apiClient.titles(addTitlesInCollectionsDto);
    }

    const handlePageClick = (selectedItem: { selected: number; }) => {
        setCollectionsPage(selectedItem.selected + 1)
    }


    if (collectionsState.error) {
        return <h1>{collectionsState.error?.message}</h1>
    }

    return (
        <div >
            <Button variant="outline-dark" size="lg" onClick={handleShow} className={css.button}>
                Добавить в коллекции
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление аниме</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className="App">
                        <div className="container">
                            <div>
                                <div className="row m-2">
                                    <SimpleCollectionList paginatedList={collectionsState?.paginatedList} clickFunction={functionOnClick} />
                                </div>

                                <ReactPaginate
                                    previousLabel={"<<"}
                                    nextLabel={">>"}
                                    breakLabel={"..."}
                                    pageCount={collectionsState?.paginatedList?.totalPages ?? 0}
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

                            <div style={{ display: "flex", marginTop: 20 }}>
                                <Button variant="secondary" onClick={handleClose}>
                                    Закрыть
                                </Button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    onClick={() => {
                                        addCollections();
                                        handleClose();
                                    }}>
                                    Добавить
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddAnimeToCollectionsModal;