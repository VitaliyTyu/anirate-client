import React, {FC, ReactElement, useEffect, useState} from 'react';
import {BriefTitleVM, BriefTitleVMPaginatedList, Client} from "../api/api";

const apiClient = new Client('https://localhost:5001');

const AnimeList: FC = (): ReactElement => {
    const [titles, setTitles] = useState<BriefTitleVM[] | undefined>()

    async function getTitles() {
        const paginatedList = await apiClient.animeTitles(1, 10);
        console.log(paginatedList.items)
        setTitles(paginatedList.items);
    }

    useEffect(() => {
        //setTimeout(getTitles, 500); check git
        getTitles()
    }, []);

    return (
        <div>
            {titles?.map((title) => (
                <div key={title.id}>
                    <div style={{marginTop: 10}}>{title.russian}</div>
                    <img src={"https://shikimori.one/" + title.image?.preview}/>
                    <div>{title.score}</div>
                </div>

                ))}
        </div>
    );
};

export default AnimeList;