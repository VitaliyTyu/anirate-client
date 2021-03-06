import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Client, BriefTitleVM, BriefCollectionVM, UpdateCollectionDetailsDto, CollectionDetailsVM } from '../../../../api/api';
import { useActions } from '../../../../hooks/useActions';
import css from './InsideChangeCollectionModal.module.css'


const apiClient = new Client('https://localhost:5001');

interface ChangeCollectionModalProps {
    page: number;
    size: number;
    collection: CollectionDetailsVM | undefined;
    children?: React.ReactChild | React.ReactNode;
}

const InsideChangeCollectionModal: FC<ChangeCollectionModalProps> = (props): ReactElement => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [name, setName] = useState(props.collection?.name ?? "");
    const [nameError, setNameError] = useState("");
    const [description, setDescription] = useState(props.collection?.userComment ?? "");
    const [descriptionError, setDescriptionError] = useState("");
    const { getCollectionDetails, authCheck } = useActions()

    const createCollection = async () => {
        authCheck()
        if (handleValidation()) {
            let updateCollectionDetailsDto: UpdateCollectionDetailsDto = {
                id: props.collection?.id,
                name,
                userComment: description,
            }
            await apiClient.changeDetails(updateCollectionDetailsDto);
            getCollectionDetails(props.collection?.id ?? "", props.page, props.size)
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
            setNameError("?????????????????????? ?????????? ???????????????? 1 ????????????");
        } else if (name.length > 100) {
            nameIsValid = false;
            setNameError("???????????????????????? ?????????? ???????????????? 100 ????????????????");
        } else if (name.length <= 100 && name.length >= 1) {
            nameIsValid = true;
        }

        if (description.length > 1500) {
            descriptionIsValid = false;
            setDescription("?????????????? ?????????????? ????????????????");
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
            <Button className={css.button}
                onClick={handleShow}
                variant="outline-dark" size="lg"
            >
                ??????????????????????????
            </Button>
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton className={css.setBackground}>
                    <Modal.Title >???????????????????????????? ??????????????????</Modal.Title>
                </Modal.Header>
                <Modal.Body className={css.setBackground}>
                    <div className={css.App}>

                        <div>
                            <div className={css.formGroup}>
                                <label>???????????????? ??????????????????</label>
                                <input
                                    value={name}
                                    placeholder="????????????????"
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </div>
                            <small className="text-danger form-text">
                                {nameError}
                            </small>
                        </div>

                        <div>
                            <div className={css.formGroup}>
                                <label>???????????????? ??????????????????</label>
                                <input
                                    value={description}
                                    placeholder="????????????????"
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
                        <Button variant="outline-danger" onClick={handleClose} className={css.buttons}>
                            ??????????????
                        </Button>
                        <Button variant="outline-dark" onClick={() => createCollection()} className={css.buttons}>
                            ????????????????
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default InsideChangeCollectionModal;