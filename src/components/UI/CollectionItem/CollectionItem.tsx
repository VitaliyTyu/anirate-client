import React, { FC, ReactElement, useEffect, useState } from 'react';
import { BriefCollectionVM, BriefTitleVM, Client, TitleDetailsVM } from "../../../api/api";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { getTitleDetails } from "../../../store/actions-creators/titleDetails";
import { useActions } from "../../../hooks/useActions";
import { useNavigate } from 'react-router-dom';
import { Card, Dropdown } from 'react-bootstrap';
import css from "./CollectionItem.module.css"


interface CollectionItemProps {
    clickFunction: () => void;
    collection: BriefCollectionVM | undefined;
    children?: React.ReactChild | React.ReactNode;
}

const CollectionItem: FC<CollectionItemProps> = (props): ReactElement => {
    const secondHandle = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
    }

    return (
        <div className={css.collection} onClick={() => props.clickFunction()}>
            <Card border="dark" className={css.collectionView} key={props.collection?.id} >

                <Card.Body className={css.detailsCol} >
                    <Card.Title className={css.collectionTitle}>{props.collection?.name}</Card.Title>
                    <Card.Text>
                        Аниме в коллекции:
                    </Card.Text>
                    <Card.Text>
                        Описание:
                    </Card.Text>
                </Card.Body>

                <div onClick={secondHandle} >
                    <Dropdown>
                        <Dropdown.Toggle variant="outline" id="dropdown-basic">
                            Действия
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant='dark'>
                            <Dropdown.Item href="#/action-1">Переименовать</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Удалить</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Добавить </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

            </Card>

        </div>
    );
};
export default CollectionItem;