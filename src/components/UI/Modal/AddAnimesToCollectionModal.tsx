import React, { useEffect, useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AddTitlesInCollectionsDto, BriefTitleVM, Client, CreateCollectionDto } from '../../../api/api';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import AnimeList from '../AnimeList/AnimeList';

const apiClient = new Client('https://localhost:5001');

const AddAnimesToCollectionModal = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const { paginatedList, loading, error, page } = useTypedSelector(state => state.titles)
    const { getTitles, setTitlesPage } = useActions()
    const pages: number[] = [];
    const makePages = useMemo(() => makePagesArr(), [paginatedList?.totalPages])
    const navigate = useNavigate()

    const functionOnClick = (item: BriefTitleVM) => {
        navigate(`/animes/${item?.id}`)
    }

    const addTitles = async (details: AddTitlesInCollectionsDto) => {
        await apiClient.titles(details);
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
                                <Button type="submit" variant="primary" onClick={() => { handleClose(); }}>
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