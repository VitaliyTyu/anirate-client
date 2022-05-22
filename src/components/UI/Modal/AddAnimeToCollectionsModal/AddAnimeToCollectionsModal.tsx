import React, { FC, useEffect, useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { AddTitlesInCollectionsDto, BriefTitleVM, Client } from '../../../../api/api';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import AnimeList from '../../AnimeList/AnimeList';
import CollectionsList from '../../CollectionList/CollectionsList';
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
    const makePages = useMemo(() => makePagesArr(), [collectionsState?.paginatedList?.totalPages])


    const handleClose = () => {
        setShow(false)
        setCollectionsIds([])
    }


    const functionOnClick = (item: BriefTitleVM) => {
        if (item.id !== undefined) {
            setCollectionsIds([...collectionsIds, item.id])
        }
    }

    function makePagesArr() {
        let arr: number[] = []
        let len = collectionsState?.paginatedList?.totalPages ?? 1
        for (let i = 0; i < len; i++) {
            arr.push(i + 1)
        }

        return arr;
    }

    useEffect(() => {
        getCollections(1, 20)
        setCollectionsPage(1)
    }, [])


    useEffect(() => {
        getCollections(collectionsState.page, 20)
    }, [collectionsState.page]);


    const addCollections = async () => {
        authCheck()
        let addTitlesInCollectionsDto: AddTitlesInCollectionsDto = {
            collectionsIds: [],
            animeTitlesIds: [props.animeId ?? ""],
        }
        await apiClient.titles(addTitlesInCollectionsDto);
    }


    if (collectionsState.error) {
        return <h1>{collectionsState.error?.message}</h1>
    }


    return (
        <div >
            <Button variant="outline-dark" size="lg" onClick={handleShow} className={css.button}>
                Добавить аниме
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление аниме</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className="App">
                        <div className="container">
                            <div>
                                <div style={{ display: "flex" }}>
                                    {makePages.map(p =>
                                        <div
                                            onClick={() => setCollectionsPage(p)}
                                            style={{
                                                border: p === collectionsState.page ? "2px solid green" : "1px solid gray",
                                                padding: 10,
                                                margin: 10,
                                            }}
                                        >
                                            {p}
                                        </div>
                                    )}
                                </div>
                                {/* <CollectionsList paginatedList={collectionsState?.paginatedList} clickFunction={functionOnClick} /> */}
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