import React, { FC, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Client, CreateCollectionDto } from '../../../api/api';
import { useActions } from '../../../hooks/useActions';

const apiClient = new Client('https://localhost:5001');

interface CreateCollectionModalProps {
    page: number;
    size: number;
    children?: React.ReactChild | React.ReactNode;
}

const CreateCollectionModal: FC<CreateCollectionModalProps> = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const { getCollections, setCollectionsPage } = useActions()

    const createCollection = async (details: CreateCollectionDto) => {
        let collectionId = await apiClient.collection(details);
    }

    const handleValidation = () => {
        let formIsValid = true;

        if (name.length < 1) {
            formIsValid = false;
            setNameError("Название введено неверно");
            return false;
        } else {
            setNameError("");
            formIsValid = true;
        }

        return formIsValid;
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleValidation();
        console.log(`Создание коллекции ${name}`);
        getCollections(props.page, props.size)
    };

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Создать коллекцию
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Создание коллекции</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="App">
                        <div className="container">
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-4">
                                    <form id="loginform" onSubmit={onSubmit}>

                                        <div className="form-group">
                                            <label>Название коллекции</label>
                                            <input
                                                placeholder="название"
                                                onChange={(event) => setName(event.target.value)}
                                            />
                                        </div>

                                        <small id="emailHelp" className="text-danger form-text">
                                            {nameError}
                                        </small>

                                        <div style={{ display: "flex", marginTop: 20 }}>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Закрыть
                                            </Button>
                                            <Button type="submit" variant="primary" onClick={() => { handleClose(); createCollection({ name }) }}>
                                                Создать
                                            </Button>
                                        </div>

                                    </form>
                                </div>
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

export default CreateCollectionModal;