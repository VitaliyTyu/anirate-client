import React, { FC, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Client, CreateCollectionDto } from '../../../../api/api';
import { useActions } from '../../../../hooks/useActions';
import css from './CreateCollectionModal.module.css'

const apiClient = new Client('https://localhost:5001');

interface CreateCollectionModalProps {
    page: number;
    size: number;
    searchString?: string;
    children?: React.ReactChild | React.ReactNode;
}

const CreateCollectionModal: FC<CreateCollectionModalProps> = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const { getCollections, authCheck, searchCollections } = useActions()

    const createCollection = async () => {
        authCheck()
        if (handleValidation()) {
            let createCollectionDto: CreateCollectionDto = {
                name,
                userComment: description
            }
            let collectionId = await apiClient.collection(createCollectionDto);
            if (props.searchString === undefined || props.searchString === "") {
                getCollections(props.page, props.size)
            } else {
                console.log(props.searchString);
                searchCollections(props.searchString, props.page, props.size)
            }
            handleClose()
        }
    }

    const handleShow = () => {
        setShow(true);
        setName("")
        setNameError("")
        setDescription("")
        setDescriptionError("")
    }

    const handleValidation = () => {
        let nameIsValid = false;
        let descriptionIsValid = false;

        setNameError("");
        setDescription("");

        if (name.length < 1) {
            nameIsValid = false;
            setNameError("Минимальная длина названия 1 символ");
        } else if (name.length > 100) {
            nameIsValid = false;
            setNameError("Максимальная длина названия 100 символов");
        } else if (name.length <= 100 && name.length >= 1) {
            nameIsValid = true;
        }

        if (description.length > 1500) {
            descriptionIsValid = false;
            setDescription("Слишком длинное описание");
            return false;
        } else {
            setNameError("");
            descriptionIsValid = true;
        }

        let formIsValid = nameIsValid && descriptionIsValid;

        return formIsValid;
    };


    return (
        <div>
            <div className={css.buttonStartPlace}>
                <Button className={css.buttonStart}
                    onClick={handleShow}
                    variant="outline-dark" size="lg"
                >
                    Создать коллекцию
                </Button>
            </div>
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton className={css.setBackground}>
                    <Modal.Title >Создание коллекции</Modal.Title>
                </Modal.Header>
                <Modal.Body className={css.setBackground}>
                    <div className={css.App}>

                        <div>
                            <div className={css.formGroup}>
                                <label>Название коллекции</label>
                                <input
                                    placeholder="название"
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </div>
                            <small className="text-danger form-text">
                                {nameError}
                            </small>
                        </div>

                        <div>
                            <div className={css.formGroup}>
                                <label>Описание коллекции</label>
                                <input
                                    placeholder="описание"
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                            </div>
                            <small className="text-danger form-text">
                                {descriptionError}
                            </small>
                        </div>

                    </div>

                    <small className="text-danger form-text">
                        {nameError}
                    </small>
                </Modal.Body>
                <Modal.Footer className={css.setBackground}>
                    <div className={css.buttonsPlace}>
                        <Button variant="outline-danger" onClick={handleClose} className={css.button}>
                            Закрыть
                        </Button>
                        <Button variant="outline-dark" onClick={() => createCollection()} className={css.button}>
                            Создать
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateCollectionModal;