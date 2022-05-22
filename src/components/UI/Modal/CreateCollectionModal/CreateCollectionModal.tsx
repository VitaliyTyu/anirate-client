import React, { FC, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Client, CreateCollectionDto } from '../../../../api/api';
import { useActions } from '../../../../hooks/useActions';
import css from './CreateCollectionModal.module.css'

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
            <Button className={css.button}
                                    onClick={handleShow} 
                                    variant="outline-dark" size="lg"
                                >
                                    Создать коллекцию
            </Button>
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton className={css.setBackground}>
                    <Modal.Title >Создание коллекции</Modal.Title>
                </Modal.Header>
                <Modal.Body className={css.setBackground}>
                    <div className='App'>
                        <div className="container">                                                           
                            <form id="loginform" onSubmit={onSubmit} className={css.App}>

                                <div className={css.formGroup}>
                                    <label>Название коллекции</label>
                                    <input
                                        placeholder="Название"
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </div>

                                <small id="emailHelp" className="text-danger form-text">
                                    {nameError}
                                </small>

                                <div className={css.buttonsPlace}>
                                    <Button variant="secondary" onClick={handleClose} className={css.button}>
                                        Закрыть
                                    </Button>
                                    <Button type="submit" variant="primary" onClick={() => { handleClose(); createCollection({ name }) }} className={css.button}>
                                        Создать
                                    </Button>
                                </div>
                            </form>                                                            
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className={css.setBackground}>

                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateCollectionModal;