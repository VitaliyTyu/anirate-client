import React, { FC, ReactElement, useEffect, useState } from 'react';
import { BriefTitleVM, Client, TitleDetailsVM } from "../../../api/api";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { getTitleDetails } from "../../../store/actions-creators/titleDetails";
import { useActions } from "../../../hooks/useActions";
import { useNavigate } from 'react-router-dom';
import css from "./AnimeItem.module.css"
import { Card } from 'react-bootstrap';

interface AnimeItemProps {
    clickFunction: () => void
    title: BriefTitleVM | undefined;
    children?: React.ReactChild | React.ReactNode;
}

const AnimeItem: FC<AnimeItemProps> = (props): ReactElement => {


    return (
        <div >
            
            
                <Card border="dark" className={css.title} onClick={() => props.clickFunction()}>
                    
                    <Card.Img variant="top" src={"https://shikimori.one/" + props.title?.image?.original} />
                    <Card.Body className={css.titleName} >
                        <Card.Title>{props.title?.russian}</Card.Title>
                        <Card.Text>
                            {props.title?.score}
                        </Card.Text>                    
                    </Card.Body>
                </Card>
            
            
        </div>
    );
};

export default AnimeItem;