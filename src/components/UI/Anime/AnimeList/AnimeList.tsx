
import { FC, ReactElement } from "react";
import { CardGroup } from "react-bootstrap";
import { BriefTitleVM, BriefTitleVMPaginatedList } from "../../../../api/api";
import AnimeItem from "../AnimeItem/AnimeItem";
import css from "./AnimeList.module.css"



interface AnimeListProps {
    clickFunction: (item: BriefTitleVM) => void;
    paginatedList: BriefTitleVMPaginatedList | undefined;
    children?: React.ReactChild | React.ReactNode;
}

const AnimeList: FC<AnimeListProps> = (props): ReactElement => {
    return (
        <div>

            <div >
                <CardGroup className={css.animeList}>
                    {props.paginatedList?.items?.map((title) => (
                        <AnimeItem
                            key={title.id}
                            title={title}
                            clickFunction={() => props.clickFunction(title)}
                        />
                    ))}
                </CardGroup>
            </div>

        </div>
    );
};

export default AnimeList;