
import { FC, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { BriefCollectionVM, BriefCollectionVMPaginatedList } from "../../../../api/api";
import CollectionItem from "../CollectionItem/CollectionItem";
import css from "./CollectionList.module.css"


interface CollectionsListProps {
    clickFunction: (item: BriefCollectionVM) => void;
    paginatedList: BriefCollectionVMPaginatedList | undefined
    searchString?: string;
    children?: React.ReactChild | React.ReactNode;
}

const CollectionsList: FC<CollectionsListProps> = (props): ReactElement => {

    return (
        <div className={css.collectionList}>
            {props.paginatedList?.items?.map((collection => (
                <CollectionItem
                    searchString={props.searchString}
                    key={collection?.id}
                    clickFunction={() => props.clickFunction(collection)}
                    page={props.paginatedList?.pageNumber ?? 1}
                    size={10}
                    collection={collection}
                />
            )))}
        </div>
    );
};

export default CollectionsList;