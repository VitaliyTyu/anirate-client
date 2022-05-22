import React, { FC, useEffect, useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BriefTitleVM, Client, CollectionDetailsVM } from '../../../../api/api';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import AnimeList from '../../AnimeList/AnimeList';
import css from './AddAnimesToCollectionModal.module.css'

const apiClient = new Client('https://localhost:5001');

interface AddAnimesToCollectionModalProps {
    collectionId: string | undefined;
    children?: React.ReactChild | React.ReactNode;
}

const AddAnimesToCollectionModal: FC<AddAnimesToCollectionModalProps> = (props) => {
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const titlesState = useTypedSelector(state => state.titles)
    const { getTitles, setTitlesPage, getCollectionDetails, authCheck } = useActions()
    const [animesIds, setAnimesIds] = useState<string[]>([])
    const makePages = useMemo(() => makePagesArr(), [titlesState?.paginatedList?.totalPages])


    const handleClose = () => {
        setShow(false)
        setAnimesIds([])
    }


    const functionOnClick = (item: BriefTitleVM) => {
        if (item.id !== undefined) {
            setAnimesIds([...animesIds, item.id])
        }
    }

    function makePagesArr() {
        let arr: number[] = []
        let len = titlesState?.paginatedList?.totalPages ?? 1
        for (let i = 0; i < len; i++) {
            arr.push(i + 1)
        }

        return arr;
    }

    useEffect(() => {
        getTitles(1, 20)
        setTitlesPage(1)
    }, [])


    useEffect(() => {
        getTitles(titlesState.page, 20)
    }, [titlesState.page]);


    const addTitles = async () => {
        authCheck()
        await apiClient.titles({ collectionsIds: [props.collectionId ?? ""], animeTitlesIds: animesIds });
        getCollectionDetails(props.collectionId)
    }


    if (titlesState.error) {
        return <h1>{titlesState.error}</h1>
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
                                            onClick={() => setTitlesPage(p)}
                                            style={{
                                                border: p === titlesState.page ? "2px solid green" : "1px solid gray",
                                                padding: 10,
                                                margin: 10,
                                            }}
                                        >
                                            {p}
                                        </div>
                                    )}
                                </div>
                                <AnimeList paginatedList={titlesState?.paginatedList} clickFunction={functionOnClick} />
                            </div>

                            <div style={{ display: "flex", marginTop: 20 }}>
                                <Button variant="secondary" onClick={handleClose}>
                                    Закрыть
                                </Button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    onClick={() => {
                                        addTitles();
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

export default AddAnimesToCollectionModal;