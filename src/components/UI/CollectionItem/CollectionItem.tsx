import React, { FC, ReactElement, useEffect, useState } from 'react';
import { BriefCollectionVM, BriefTitleVM, Client, TitleDetailsVM } from "../../../api/api";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { getTitleDetails } from "../../../store/actions-creators/titleDetails";
import { useActions } from "../../../hooks/useActions";
import { useNavigate } from 'react-router-dom';
import { Card, Dropdown } from 'react-bootstrap';
import css from "./CollectionItem.module.css"


interface CollectionItemProps {
    clickFunction: () => void;
    collection: BriefCollectionVM | undefined;
    children?: React.ReactChild | React.ReactNode;
}

const CollectionItem: FC<CollectionItemProps> = (props): ReactElement => {
    const secondHandle = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
    }

    return (
            <div  className={css.collection} onClick={() => props.clickFunction()}> 
                <Card border="dark" className={css.collectionView} key={props.collection?.id} >                 
                    
                        <Card.Body className={css.detailsCol} >
                            <Card.Title className={css.collectionTitle}>{props.collection?.name}</Card.Title>
                            <Card.Text>
                                Аниме в коллекции: {props.collection?.animesCount}
                            </Card.Text>   
                            <Card.Text className={css.userComment}>
                                Описание: <br />   
                                Кто приходит на ум, когда речь заходит о тайных агентах? Конечно же, невероятный Джеймс Бонд, который постоянно подвергает жизнь опасности, выполняя секретные миссии. О таком харизматичном и смелом мужчине мечтают многие дамы, так что Агент 007 купается в лучах женского внимания.
Герой этой истории, Лойд Форджер, является «Джеймсом Бондом» своего времени. Погони, шпионаж, перестрелки, тайные миссии — всё это является неотъемлемой частью его жизни. Закончив одно задание, он тут же принимается за другое — усталость ему неведома. Однако на этот раз миссия оказывается немного необычной: он должен сохранить мир между двумя странами, а для этого ему предстоит обзавестись фиктивной семьёй. Роль «роковой красотки из Бондианы», и по совместительству жены Лойда, достаётся Йор Форджер — профессиональной наёмной убийце с кодовым именем Тернистая Принцесса. Для полноты картины осталось обзавестись ещё и ребёнком, и эспер Аня Форджер только рада заполучить себе крутых новых родителей.

Теперь новой семье предстоит не только выполнить секретное задание, не раскрыв себя, но и понять, что семья — это гораздо больше, чем просто кровные родственники.                              
                                {props.collection?.userComment}
                            </Card.Text>                    
                        </Card.Body>
                        
                        <div onClick={secondHandle} >
                            <Dropdown>
                                <Dropdown.Toggle variant="outline" id="dropdown-basic">
                                    Действия
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant = 'dark'>
                                    <Dropdown.Item href="#/action-1">Редактировать</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Удалить</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Добавить аниме</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                                      
                </Card>

        </div>
    );
};
export default CollectionItem;