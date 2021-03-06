
import { FC, useState, useMemo, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { Client, BriefTitleVM, BriefCollectionVM } from '../../../../api/api';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import AnimeList from '../../Anime/AnimeList/AnimeList';
import css from './AddAnimesToCollectionModal.module.css'

const apiClient = new Client('https://localhost:5001');

interface AddAnimesToCollectionModalProps {
    collectionId: string | undefined;
    page: number;
    size: number;
    searchString?: string;
    children?: React.ReactChild | React.ReactNode;
}

const AddAnimesToCollectionModal: FC<AddAnimesToCollectionModalProps> = (props) => {
    const [show, setShow] = useState(false)
    const titlesState = useTypedSelector(state => state.titles)
    const { getTitles, setTitlesPage, getCollectionDetails, authCheck, getCollections, searchTitles, searchCollections } = useActions()
    const [animesIds, setAnimesIds] = useState<string[]>([])
    const [searchString, setSearchString] = useState("")
    const [isSearch, setIsSearch] = useState<boolean>(false)

    const handleShow = () => {
        getTitles(1, 10)
        setTitlesPage(1)
        setAnimesIds([])
        setSearchString("")
        setIsSearch(false)
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
        setIsSearch(false)
        setAnimesIds([])
        setSearchString("")
    }

    const functionOnClick = (item: BriefTitleVM) => {
        if (item.id === undefined) return
        if (animesIds?.indexOf(item?.id) !== -1) {
            setAnimesIds(animesIds.filter(animeId => animeId !== item?.id))
        } else {
            setAnimesIds([...animesIds, item.id])
        }
    }

    useEffect(() => {
        if (isSearch) {
            searchTitles(searchString ?? "", titlesState.page, 10)
        } else {
            getTitles(titlesState.page, 10)
        }
    }, [titlesState.page]);


    const addTitles = async () => {
        authCheck()
        await apiClient.titles({ collectionsIds: [props.collectionId ?? ""], animeTitlesIds: animesIds });
        getCollectionDetails(props.collectionId, 1, 20)
        if (props.searchString === undefined || props.searchString === "") {
            getCollections(props.page, props.size)
        } else {
            searchCollections(props.searchString, props.page, props.size)
        }

    }

    const handleValidation = () => {
        let searchStringIsValid = true;

        if (searchString.length < 1) {
            searchStringIsValid = false;
        }

        return searchStringIsValid;
    };

    const handlePageClick = (selectedItem: { selected: number; }) => {
        setTitlesPage(selectedItem.selected + 1)
    }

    const search = () => {
        if (handleValidation()) {
            searchTitles(searchString ?? "", 1, 10)
            setIsSearch(true)
        }
    }

    const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode == 13 && handleValidation()) {
            e.preventDefault();
            searchTitles(searchString ?? "", 1, 10)
            setIsSearch(true)
        }
    }

    const addAction = () => {
        if (animesIds.length === 0) {
            handleClose();
        } else {
            addTitles();
            handleClose();
        }
    }

    if (titlesState.error) {
        return <h1>{titlesState.error}</h1>
    }

    return (
        <div >
            <Button variant="outline-dark" size="lg" onClick={handleShow} className={css.buttonAdd}>
                ???????????????? ??????????
            </Button>

            <Modal show={show} onHide={handleClose} size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title>???????????????????? ??????????</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <form className="d-flex">
                        <input className="form-control ms-5"
                            placeholder="??????????"
                            aria-label="Search"
                            onChange={(event) => setSearchString(event.target.value)}
                            onKeyDown={(event) => onEnterPress(event)}

                        />
                        <Button
                            variant="outline-dark"

                            onClick={search}
                            className={css.buttonSearch}
                        >
                            ??????????
                        </Button>
                    </form>

                    <div className={css.App}>

                        <AnimeList
                            animesIds={animesIds}
                            paginatedList={titlesState?.paginatedList} clickFunction={functionOnClick}
                        />


                        <ReactPaginate
                            previousLabel={"<<"}
                            nextLabel={">>"}
                            breakLabel={"..."}
                            pageCount={titlesState?.paginatedList?.totalPages ?? 0}
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
                    </div>

                    <div className={css.buttonPlace}>
                        <Button variant="outline-danger" onClick={handleClose} className={css.button}>
                            ??????????????
                        </Button>
                        <Button
                            className={css.button}
                            variant="outline-dark"
                            onClick={addAction}>
                            ????????????????
                        </Button>
                    </div>

                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddAnimesToCollectionModal;