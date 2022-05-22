import { FC, ReactElement } from "react";
import { Button, Card, Dropdown } from "react-bootstrap";
import { BriefCollectionVM, Client, DeleteCollectionsDto } from "../../../../api/api";
import { useActions } from "../../../../hooks/useActions";
import AddAnimesToCollectionModal from "../../Modal/AddAnimesToCollectionModal/AddAnimesToCollectionModal";
import css from "./CollectionItem.module.css"


const apiClient = new Client('https://localhost:5001');

interface CollectionItemProps {
    clickFunction: () => void;
    collection: BriefCollectionVM | undefined;
    children?: React.ReactChild | React.ReactNode;
}

const CollectionItem: FC<CollectionItemProps> = (props): ReactElement => {
    const { getCollections } = useActions()

    const secondHandle = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
    }

    const deleteCollection = async () => {
        let deleteCollectionsDto: DeleteCollectionsDto = {
            animeCollectionsIds: [props.collection?.id ?? ""],
        }
        await apiClient.deleteCollections(deleteCollectionsDto)
        getCollections(1, 10)

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

                <div onClick={secondHandle} >
                    <Dropdown>
                        <Dropdown.Toggle variant="outline" id="dropdown-basic">
                            Действия
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant='dark'>
                            <Dropdown.Item>Редактировать</Dropdown.Item>
                            <Dropdown.Item>
                                <Button onClick={() => deleteCollection()}>
                                    Удалить коллекцию
                                </Button>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <AddAnimesToCollectionModal collectionId={props.collection?.id} />
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Card>
        </div>
    );
};
export default CollectionItem;