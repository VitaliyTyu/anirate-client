import { FC, ReactElement } from "react";
import { Button, Card, Dropdown } from "react-bootstrap";
import { BriefCollectionVM, Client, DeleteCollectionsDto } from "../../../../api/api";
import { useActions } from "../../../../hooks/useActions";
import AddAnimesToCollectionModal from "../../Modal/AddAnimesToCollectionModal/AddAnimesToCollectionModal";
import ChangeCollectionModal from "../../Modal/ChangeCollectionModal/ChangeCollectionModal";
import css from "./CollectionItem.module.css"


const apiClient = new Client('https://localhost:5001');

interface CollectionItemProps {
    clickFunction: () => void;
    collection: BriefCollectionVM | undefined;
    children?: React.ReactChild | React.ReactNode;
    page: number;
    size: number;
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
        getCollections(props.page, props.size)
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

                        <Dropdown.Menu>
                            <Dropdown.Item className={css.item}>
                                <ChangeCollectionModal
                                    collection={props.collection}
                                    page={props.page}
                                    size={props.size}
                                />
                            </Dropdown.Item>
                            <Dropdown.Item className={css.item}>
                                <Button onClick={() => deleteCollection()} variant="outline-dark" size="lg" className={css.button}>
                                    Удалить коллекцию
                                </Button>
                            </Dropdown.Item>
                            <Dropdown.Item className={css.item}>
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