import { FC, ReactElement } from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import { BriefCollectionVM } from '../../../../api/api';
import AddAnimesToCollectionModal from '../../Modal/AddAnimesToCollectionModal/AddAnimesToCollectionModal';
import css from "./SimpleCollectionItem.module.css"


interface SimpleCollectionItemProps {
    clickFunction: () => void;
    collection: BriefCollectionVM | undefined;
    children?: React.ReactChild | React.ReactNode;
}

const SimpleCollectionItem: FC<SimpleCollectionItemProps> = (props): ReactElement => {
    const secondHandle = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
    }

    return (
        <div className={css.collection} onClick={() => props.clickFunction()}>
            <Card border="dark" className={css.collectionView} key={props.collection?.id} >

                <Card.Body className={css.detailsCol} >
                    <Card.Title className={css.collectionTitle}>{props.collection?.name}</Card.Title>
                    <Card.Text>
                        Аниме в коллекции: {props.collection?.animesCount}
                    </Card.Text>
                    <Card.Text className={css.userComment}>
                        Описание: <br />
                        {props.collection?.userComment ? props.collection?.userComment : ""}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default SimpleCollectionItem;