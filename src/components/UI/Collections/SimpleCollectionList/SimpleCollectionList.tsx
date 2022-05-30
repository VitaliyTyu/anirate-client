import { FC, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { BriefCollectionVM, BriefCollectionVMPaginatedList } from "../../../../api/api";
import SimpleCollectionItem from "../SimpleCollectionItem/SimpleCollectionItem";
import css from "./SimpleCollectionList.module.css"


interface SimpleCollectionListProps {
    clickFunction: (item: BriefCollectionVM) => void;
    paginatedList: BriefCollectionVMPaginatedList | undefined
    collectionsIds?: string[];
    children?: React.ReactChild | React.ReactNode;
}


const SimpleCollectionList: FC<SimpleCollectionListProps> = (props): ReactElement => {
    return (
        <div className={css.collectionList}>
            {props.paginatedList?.items?.map((collection => (
                <SimpleCollectionItem
                    collectionsIds={props.collectionsIds}
                    key={collection?.id}
                    clickFunction={() => props.clickFunction(collection)}
                    collection={collection}
                />
            )))}
        </div>
    );
};

export default SimpleCollectionList;