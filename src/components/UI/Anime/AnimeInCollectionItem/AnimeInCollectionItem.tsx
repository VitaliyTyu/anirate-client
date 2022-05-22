import { FC, ReactElement } from "react";
import { Button, Card } from "react-bootstrap";
import { BriefTitleVM } from "../../../../api/api";
import React from 'react';
import css from "./AnimeInCollectionItem.module.css"


interface AnimeInCollectionItemProps {
    clickFunction: () => void
    title: BriefTitleVM | undefined;
    children?: React.ReactChild | React.ReactNode;
}

const AnimeInCollectionItem: FC<AnimeInCollectionItemProps> = (props): ReactElement => {
    return (
        <div >
            <Card border="dark" className={css.title} onClick={() => props.clickFunction()}>
                <Card.Img variant="top" src={"https://shikimori.one/" + props.title?.image?.original} />
                <Card.Body className={css.titleName} >
                    <Card.Title className={css.titleNameTitle}>{props.title?.russian}</Card.Title>
                    <Card.Text>
                        {props.title?.score}
                    </Card.Text>
                </Card.Body>
                <Button>
                    Удалить
                </Button>
            </Card>

        </div>
    );
};

export default AnimeInCollectionItem;