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
    searchString?: string;
    children?: React.ReactChild | React.ReactNode;
    page: number;
    size: number;
}

const CollectionItem: FC<CollectionItemProps> = (props): ReactElement => {
    const { getCollections, searchCollections } = useActions()

    const secondHandle = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
    }

    const deleteCollection = async () => {
        let deleteCollectionsDto: DeleteCollectionsDto = {
            animeCollectionsIds: [props.collection?.id ?? ""],
        }
        await apiClient.deleteCollections(deleteCollectionsDto)
        if (props.searchString === undefined || props.searchString === "") {
            getCollections(props.page, props.size)
        } else {
            searchCollections(props.searchString, props.page, props.size)
        }
    }

    return (
        <div className={css.collection} onClick={() => props.clickFunction()}>
            <Card border="dark" className={css.collectionView} key={props.collection?.id} >

                <Card.Body className={css.detailsCol} >
                    <div className={css.detailsItems}>
                        <div className={css.collectionItem}>
                            <Card.Title className={css.collectionTitle}>{props.collection?.name}</Card.Title>
                            <Card.Text className={css.collectionTitle}>
                                Аниме в коллекции: {props.collection?.animesCount}
                            </Card.Text>
                        </div>
                        <div onClick={secondHandle} className={css.actionItem}>
                            <Dropdown>
                                <Dropdown.Toggle variant="outline" id="dropdown-basic">
                                    Действия
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant='light'>
                                    <Dropdown.Item className={css.item}>
                                        <AddAnimesToCollectionModal
                                            page={props.page}
                                            size={props.size}
                                            searchString={props.searchString}
                                            collectionId={props.collection?.id}
                                        />
                                    </Dropdown.Item>
                                    <Dropdown.Item className={css.item}>
                                        <ChangeCollectionModal
                                            searchString={props.searchString}
                                            collection={props.collection}
                                            page={props.page}
                                            size={props.size}
                                        />
                                    </Dropdown.Item>
                                    <Dropdown.Item className={css.item}>
                                        <Button
                                            className={css.button}
                                            variant="outline-dark" size="lg"
                                            onClick={() => deleteCollection()}>
                                            Удалить коллекцию
                                        </Button>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <Card.Text className={css.userComment}>
                        Описание: <br />
                        {props.collection?.userComment ? props.collection?.userComment : ""}
                    </Card.Text>
                </Card.Body>


            </Card>
        </div>
    );
};
export default CollectionItem;