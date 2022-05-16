import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

const ExactCollectionPage = () => {
    const { collectionDetails, loading, error, currentId } = useTypedSelector(state => state.collectionDetails)
    const { getCollectionDetails } = useActions()
    const params = useParams()

    useEffect(() => {
        getCollectionDetails(params.id)
    }, []);

    if (loading) {
        return <h1>Идет загрузка...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div>
            <div>{collectionDetails?.name}</div>
            <img src={"https://shikimori.one/" + collectionDetails?.image?.original} />
            <Button>
                Добавить аниме
            </Button>
        </div>
    );
};

export default ExactCollectionPage;