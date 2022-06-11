import React, { FC, useEffect, useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import {
    AddTitlesInCollectionsDto,
    BriefCollectionVM,
    BriefTitleVM,
    Client,
} from "../../../../api/api";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import AnimeList from "../../Anime/AnimeList/AnimeList";
import CollectionsList from "../../Collections/CollectionList/CollectionsList";
import SimpleCollectionList from "../../Collections/SimpleCollectionList/SimpleCollectionList";
import css from "./AddAnimeToCollectionModal.module.css";

const apiClient = new Client("https://localhost:5001");

interface AddAnimeToCollectionsModalProps {
    animeId: string | undefined;
    children?: React.ReactChild | React.ReactNode;
}

const AddAnimeToCollectionsModal: FC<AddAnimeToCollectionsModalProps> = (
    props
) => {
    const [show, setShow] = useState(false);
    const collectionsState = useTypedSelector((state) => state.collections);
    const { getCollections, setCollectionsPage, authCheck, searchCollections } =
        useActions();
    const [collectionsIds, setCollectionsIds] = useState<string[]>([]);
    const [searchString, setSearchString] = useState("");
    const [isSearch, setIsSearch] = useState<boolean>(false);

    const handleClose = () => {
        setShow(false);
        setIsSearch(false);
        setCollectionsIds([]);
        setSearchString("");
    };

    const handleShow = () => {
        getCollections(1, 10);
        setCollectionsPage(1);
        setCollectionsIds([]);
        setSearchString("");
        setIsSearch(false);
        setShow(true);
    };

    const functionOnClick = (item: BriefCollectionVM) => {
        if (item.id === undefined) return;
        if (collectionsIds?.indexOf(item?.id) !== -1) {
            setCollectionsIds(
                collectionsIds.filter((collectionsId) => collectionsId !== item?.id)
            );
        } else {
            setCollectionsIds([...collectionsIds, item.id]);
        }
    };

    useEffect(() => {
        if (isSearch) {
            searchCollections(searchString ?? "", collectionsState.page, 10);
        } else {
            getCollections(collectionsState.page, 10);
        }
    }, [collectionsState.page]);

    const addCollections = async () => {
        authCheck();
        let addTitlesInCollectionsDto: AddTitlesInCollectionsDto = {
            collectionsIds,
            animeTitlesIds: [props.animeId ?? ""],
        };
        await apiClient.titles(addTitlesInCollectionsDto);
    };

    const handleValidation = () => {
        let searchStringIsValid = true;

        if (searchString.length < 1) {
            searchStringIsValid = false;
        }

        return searchStringIsValid;
    };

    const handlePageClick = (selectedItem: { selected: number }) => {
        setCollectionsPage(selectedItem.selected + 1);
    };

    const search = () => {
        if (handleValidation()) {
            searchCollections(searchString ?? "", 1, 10);
            setIsSearch(true);
        }
    };

    const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode == 13 && handleValidation()) {
            e.preventDefault();
            searchCollections(searchString ?? "", 1, 10);
            setIsSearch(true);
        }
    };

    const addAction = () => {
        if (collectionsIds.length === 0) {
            handleClose();
        } else {
            addCollections();
            handleClose();
        }
    };

    if (collectionsState.error) {
        return <h1>{collectionsState.error?.message}</h1>;
    }

    return (
        <div>
            <Button
                variant="outline-dark"
                size="lg"
                onClick={handleShow}
                className={css.buttonAdd}
            >
                Добавить в коллекции
            </Button>

            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Добавление в коллекции</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="d-flex">
                        <input
                            className="form-control ms-5"
                            placeholder="Поиск"
                            aria-label="Search"
                            onChange={(event) => setSearchString(event.target.value)}
                            onKeyDown={(event) => onEnterPress(event)}
                        />
                        <Button variant="outline-dark" onClick={search} className={css.buttonSearch}>
                            Поиск
                        </Button>
                    </form>

                    <div className={css.App}>
                        <SimpleCollectionList
                            collectionsIds={collectionsIds}
                            paginatedList={collectionsState?.paginatedList}
                            clickFunction={functionOnClick}
                        />

                        {collectionsState?.paginatedList?.totalPages == 0 ? (
                            <div className={css.textIfCollectionsIsEmpty}>
                                Коллекции еще не добавлены
                            </div>
                        ) : (
                            <ReactPaginate
                                previousLabel={"<<"}
                                nextLabel={">>"}
                                breakLabel={"..."}
                                pageCount={collectionsState?.paginatedList?.totalPages ?? 0}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination justify-content-center"}
                                pageClassName={"page-item"}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                breakClassName={"page-item"}
                                breakLinkClassName={"page-link"}
                                activeClassName={"active"}
                            />
                        )}
                    </div>

                    <div className={css.buttonPlace}>
                        <Button
                            variant="outline-danger"
                            onClick={handleClose}
                            className={css.button}
                        >
                            Закрыть
                        </Button>
                        <Button

                            variant="outline-dark"
                            onClick={addAction}
                            className={css.button}
                        >
                            Добавить
                        </Button>
                    </div>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddAnimeToCollectionsModal;
