
import { FC, ReactElement, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { BriefTitleVM } from "../../../../api/api";
import css from "./AnimeItem.module.css"


interface AnimeItemProps {
    clickFunction: () => void
    title: BriefTitleVM | undefined;
    animesIds?: string[] | undefined;
    children?: React.ReactChild | React.ReactNode;
}

const AnimeItem: FC<AnimeItemProps> = (props): ReactElement => {
    const [isSelected, setIsSelected] = useState(false)

    useEffect(() => {
        if (props.title?.id === undefined) {
            setIsSelected(false)
            return
        }

        if (props.animesIds === undefined) {
            setIsSelected(false)
            return
        }

        if (props.animesIds?.indexOf(props.title?.id) !== -1) {
            setIsSelected(true)
        } else {
            setIsSelected(false)
        }

    }, [props.animesIds])

    return (
        <div>
            <Card border="dark" className={isSelected ? css.titleSelected : css.title} onClick={() => props.clickFunction()}>
                <Card.Img variant="top" src={"https://shikimori.one/" + props.title?.image?.original} />
                <Card.Body className={css.titleName} >
                    <Card.Title className={css.titleNameTitle}>{props.title?.russian}</Card.Title>
                    <Card.Text>
                        Рейтинг: {props.title?.score}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AnimeItem;