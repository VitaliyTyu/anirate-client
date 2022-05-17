import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { BriefCollectionVM } from '../../../api/api';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import AnimeList from '../../UI/AnimeList/AnimeList';
import AddAnimesToCollectionModal from '../../UI/Modal/AddAnimesToCollectionModal';

const ExactCollectionPage = () => {
    const { collectionDetails, loading, error, currentId } = useTypedSelector(state => state.collectionDetails)
    const { getCollectionDetails } = useActions()
    const params = useParams()
    const [imgPath, setImgPath] = useState("https://dummyimage.com/150x250/b8b6b8/666669&text=Коллекция");
    const navigate = useNavigate()
    const functionOnClick = (item: BriefCollectionVM) => {
        navigate(`/collections/${item?.id}`)
    }

    useEffect(() => {
        if (collectionDetails?.image == null) {
            setImgPath("https://dummyimage.com/150x250/b8b6b8/666669&text=Коллекция")
        }
        else {
            setImgPath("https://shikimori.one/" + collectionDetails?.image?.preview)
        }
    }, [])


    useEffect(() => {
        getCollectionDetails(params.id)
    }, []);

    // if (loading) {
    //     return <h1>Идет загрузка...</h1>
    // }

    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div>
            <div>{collectionDetails?.name}</div>
            {/* <div style={{ marginBottom: 30 }}><img src={imgPath} /></div> */}
            <div style={{ marginBottom: 30 }}><img src={"https://shikimori.one/" + collectionDetails?.image?.preview} /></div>
            <AddAnimesToCollectionModal collectionId={collectionDetails?.id} />
            <AnimeList clickFunction={functionOnClick} paginatedList={collectionDetails?.animeTitles} />

        </div>
    );
};

export default ExactCollectionPage;