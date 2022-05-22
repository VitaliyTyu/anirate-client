
import { FC, ReactElement } from "react";
import { Card } from "react-bootstrap";
import { BriefTitleVM } from "../../../../api/api";
import css from "./AnimeItem.module.css"


interface AnimeItemProps {
    clickFunction: () => void
    title: BriefTitleVM | undefined;
    children?: React.ReactChild | React.ReactNode;
}

const AnimeItem: FC<AnimeItemProps> = (props): ReactElement => {
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
            </Card>
        </div>
    );
};

export default AnimeItem;