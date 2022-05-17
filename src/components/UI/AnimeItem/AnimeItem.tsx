import React, { FC, ReactElement, useEffect, useState } from 'react';
import { BriefTitleVM, Client, TitleDetailsVM } from "../../../api/api";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { getTitleDetails } from "../../../store/actions-creators/titleDetails";
import { useActions } from "../../../hooks/useActions";
import { useNavigate } from 'react-router-dom';
import css from "./AnimeItem.module.css"

interface AnimeItemProps {
    clickFunction: () => void
    title: BriefTitleVM | undefined;
    children?: React.ReactChild | React.ReactNode;
}

const AnimeItem: FC<AnimeItemProps> = (props): ReactElement => {


    return (
        <div>
            <div className={css.title}
                onClick={() => props.clickFunction()}
            >
                <div className={css.titleName}>{props.title?.russian}</div>
                <div className={css.titleImage}>
                    <img src={"https://shikimori.one/" + props.title?.image?.original} />
                </div>
                <div className={css.titleScore}>{props.title?.score}</div>
            </div>
        </div>
    );
};

export default AnimeItem;