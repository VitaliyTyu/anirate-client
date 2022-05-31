import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Client, BriefTitleVM, BriefCollectionVM, UpdateCollectionDetailsDto } from '../../../../api/api';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import AnimeList from '../../Anime/AnimeList/AnimeList';
import css from './ChangeCollectionModal.module.css'


const apiClient = new Client('https://localhost:5001');

interface ChangeCollectionModalProps {
    page: number;
    size: number;
    collection: BriefCollectionVM | undefined;
    children?: React.ReactChild | React.ReactNode;
    searchString?: string;
}

const ChangeCollectionModal: FC<ChangeCollectionModalProps> = (props): ReactElement => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [name, setName] = useState(props.collection?.name ?? "");
    const [nameError, setNameError] = useState("");
    const [description, setDescription] = useState(props.collection?.userComment ?? "");
    const [descriptionError, setDescriptionError] = useState("");
    const { getCollections, authCheck, searchCollections } = useActions()

    const changeCollection = async () => {
        authCheck()
        if (handleValidation()) {
            let updateCollectionDetailsDto: UpdateCollectionDetailsDto = {
                id: props.collection?.id,
                name,
                userComment: description,
            }
            await apiClient.changeDetails(updateCollectionDetailsDto);
            if (props.searchString === undefined || props.searchString === "") {
                getCollections(props.page, props.size)
            } else {
                searchCollections(props.searchString, props.page, props.size)
            }
            handleClose()
        }
    }

    const handleShow = () => {
        setShow(true);
        setName(props.collection?.name ?? "")
        setNameError("")
        setDescription(props.collection?.userComment ?? "")
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
            <Button className={css.buttonStart}
                onClick={handleShow}
                variant="outline-dark" size="lg"
            >
                Редактировать
            </Button>
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton className={css.setBackground}>
                    <Modal.Title >Редактирование коллекции</Modal.Title>
                </Modal.Header>
                <Modal.Body className={css.setBackground}>
                    <div className={css.App}>

                        <div>
                            <div className={css.formGroup}>
                                <label>Название коллекции</label>
                                <input
                                    value={name}
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
                                    value={description}
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
                        <Button variant="secondary" onClick={handleClose} className={css.button}>
                            Закрыть
                        </Button>
                        <Button type="submit" variant="primary" onClick={() => changeCollection()} className={css.button}>
                            Изменить
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ChangeCollectionModal;