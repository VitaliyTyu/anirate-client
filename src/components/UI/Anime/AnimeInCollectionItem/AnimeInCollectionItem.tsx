import { FC, ReactElement } from "react";
import { Button, Card } from "react-bootstrap";
import { BriefTitleVM, Client, DeleteManyTitlesFromCollectionDto } from "../../../../api/api";
import React from 'react';
import css from "./AnimeInCollectionItem.module.css"
import { useActions } from "../../../../hooks/useActions";


const apiClient = new Client('https://localhost:5001');

interface AnimeInCollectionItemProps {
    clickFunction: () => void
    title: BriefTitleVM | undefined;
    children?: React.ReactChild | React.ReactNode;
    collectionId: string;
    page: number;
    size: number;
}

const AnimeInCollectionItem: FC<AnimeInCollectionItemProps> = (props): ReactElement => {
    const { getCollectionDetails } = useActions()


    const deleteAnimeFromCollection = async () => {
        let deleteManyTitlesFromCollectionDto: DeleteManyTitlesFromCollectionDto = {
            id: props.collectionId,
            animeTitlesIds: [props.title?.id ?? ""],
        }
        await apiClient.manyTitlesFromCollection(deleteManyTitlesFromCollectionDto)
        getCollectionDetails(props.collectionId, props.page, props.size)
    }

    return (
        <div className={css.item}>
            <Card border="dark" className={css.title} onClick={() => props.clickFunction()}>
                <Card.Img variant="top" src={"https://shikimori.one/" + props.title?.image?.original} />
                <Card.Body className={css.titleName} >
                    <Card.Title className={css.titleNameTitle}>{props.title?.russian}</Card.Title>
                    <Card.Text>
                        Рейтинг: {props.title?.score}
                    </Card.Text>
                </Card.Body>
            </Card>
            <Button onClick={() => deleteAnimeFromCollection()} className={css.button}>
                Удалить аниме
            </Button>

        </div>
    );
};

export default AnimeInCollectionItem;