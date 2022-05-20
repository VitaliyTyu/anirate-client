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
    const [imgPath, setImgPath] = useState("https://dummyimage.com/150x250/b8b6b8/666669&text=Коллекция");

    useEffect(() => {
        if (props.collection?.image == undefined) {
            setImgPath("https://dummyimage.com/150x250/b8b6b8/666669&text=Коллекция")
        }
        else {
            setImgPath("https://shikimori.one/" + props.collection?.image?.preview)
        }
    }, [props.collection?.image])

    const secondHandle = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
      }

    return (
            <div  className={css.collection} onClick={() => props.clickFunction()}> 
                <Card border="dark" className={css.collectionView} >                 
                    <div className={css.collectionItem}  key={props.collection?.id}>
                        <Card.Img  src={"https://shikimori.one/" + props.collection?.image?.preview}/>
                        <Card.Body className={css.detailsCol} >
                            <Card.Title>{props.collection?.name}</Card.Title>
                            <Card.Text>
                                ЧТО_НИБУДЬ
                            </Card.Text>                    
                        </Card.Body>

                    <Card.Body className={css.detailsAnim} >
                        <Card.Title>АНИМЕ:</Card.Title>
                        <Card.Text>
                            список аниме
                        </Card.Text>                    
                    </Card.Body>
                    <div onClick={secondHandle} >
                    <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Действия
                            </Dropdown.Toggle>

                            <Dropdown.Menu variant = 'dark'>
                                <Dropdown.Item href="#/action-1">Переименовать</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Удалить</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        </div>
                    </div>
                    {/* <div className={css.buttonPlace}>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Действия
	@@ -57,7 +74,7 @@ const CollectionItem: FC<CollectionItemProps> = (props): ReactElement => {
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div> */}
                </Card>

            </div>
    );
};
export default CollectionItem;