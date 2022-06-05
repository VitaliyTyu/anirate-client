import { FC, ReactElement, useEffect, useState } from "react";
import { Card, Dropdown } from "react-bootstrap";
import { BriefCollectionVM } from "../../../../api/api";
import AddAnimesToCollectionModal from "../../Modal/AddAnimesToCollectionModal/AddAnimesToCollectionModal";
import css from "./SimpleCollectionItem.module.css";

interface SimpleCollectionItemProps {
  clickFunction: () => void;
  collection: BriefCollectionVM | undefined;
  collectionsIds?: string[];
  children?: React.ReactChild | React.ReactNode;
}

const SimpleCollectionItem: FC<SimpleCollectionItemProps> = (
  props
): ReactElement => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (props.collection?.id === undefined) {
      setIsSelected(false);
      return;
    }

    if (props.collectionsIds === undefined) {
      setIsSelected(false);
      return;
    }

    if (props.collectionsIds?.indexOf(props.collection?.id) !== -1) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [props.collectionsIds]);

  return (
    <div
      className={isSelected ? css.Selectedcollection : css.collection}
      onClick={() => props.clickFunction()}
    >
      <Card
        border="dark"
        className={css.collectionView}
        key={props.collection?.id}
      >
        <Card.Body className={css.detailsCol}>
          <Card.Title className={css.collectionTitle}>
            {props.collection?.name}
          </Card.Title>
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
