import React, { FC, ReactElement, useEffect, useState } from 'react';
import { BriefTitleVM, Client, TitleDetailsVM } from "../api/api";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { getTitleDetails } from "../store/actions-creators/titleDetails";
import { useActions } from "../hooks/useActions";
import { useNavigate } from 'react-router-dom';

interface AnimeItemProps {
    clickFunction: () => void
    title: BriefTitleVM | undefined;
    children?: React.ReactChild | React.ReactNode;
}

const AnimeItem: FC<AnimeItemProps> = (props): ReactElement => {


    return (
        <div>
            <div
                onClick={() => props.clickFunction()}
            >
                <div style={{ width: 156, height: 50 }}>{props.title?.russian}</div>
                <div style={{ width: 156, height: 250 }}>
                    <img src={"https://shikimori.one/" + props.title?.image?.preview} />
                </div>
                <div style={{ marginBottom: 40 }}>{props.title?.score}</div>
            </div>
        </div>
    );
};

export default AnimeItem;