import React, { FC, useEffect, useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AddTitlesInCollectionsDto, BriefTitleVM, Client, BriefCollectionVM } from '../../../api/api';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import AnimeList from '../AnimeList/AnimeList';

const apiClient = new Client('https://localhost:5001');

interface AddAnimesToCollectionModalProps {
    collectionId: string | undefined;
    children?: React.ReactChild | React.ReactNode;
}

const AddAnimesToCollectionModal: FC<AddAnimesToCollectionModalProps> = (props) => {
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const { paginatedList, loading, error, page } = useTypedSelector(state => state.titles)
    const { getTitles, setTitlesPage } = useActions()
    const makePages = useMemo(() => makePagesArr(), [paginatedList?.totalPages])
    const navigate = useNavigate()
    const [animesIds, setAnimesIds] = useState<string[]>([])
    const _collectionIds: string[] = []
    const { getCollectionDetails } = useActions()


    useEffect(() => {
        if (props.collectionId !== undefined) {
            _collectionIds.push(props.collectionId)
        }
    }, []);



    const functionOnClick = (item: BriefTitleVM) => {
        if (item.id !== undefined) {
            setAnimesIds([...animesIds, item.id])
        }
    }

    const handleClose = () => {
        setShow(false)
        setAnimesIds([])
    }


    useEffect(() => {
        console.log("details", animesIds);
    }, [animesIds]);

    const addTitles = async () => {
        console.log(_collectionIds);
        console.log(animesIds);
        // "CollectionsIds": ["b8a763cc-36d7-4f7b-94c5-cf73665d952f"],
        // "AnimeTitlesIds": ["8acfbba6-8247-4358-b14a-5558102637fd"]
        await apiClient.titles({ collectionsIds: ["b8a763cc-36d7-4f7b-94c5-cf73665d952f"], animeTitlesIds: animesIds });
        getCollectionDetails("b8a763cc-36d7-4f7b-94c5-cf73665d952f", 1, 10)
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
    }, [page]);

    if (error) {
        return <h1>{error}</h1>
    }


    // if (loading) {
    //     return <h1>Идет загрузка...</h1>
    // }


    return (
        <div >
            <Button variant="outline-dark" size="lg" onClick={handleShow}>
                Добавить аниме
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добвление аниме</Modal.Title>
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