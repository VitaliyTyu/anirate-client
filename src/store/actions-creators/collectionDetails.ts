import { Dispatch } from "redux";
import { Client } from "../../api/api";
import { CollectionDetailsAction, CollectionDetailsActionTypes } from "../../types/collectionDetails";

const apiClient = new Client('https://localhost:5001');

export const getCollectionDetails = (id: string | undefined, page: number = 1, size: number = 10) => {
    return async (dispatch: Dispatch<CollectionDetailsAction>) => {
        try {
            dispatch({
                type: CollectionDetailsActionTypes.FETCH_COLLECTION_DETAILS
            })

            if (id === undefined) {
                throw "id was undefined"
            }

            const collectionDetails = await apiClient.collectionDetails(id, page, size);

            dispatch({
                type: CollectionDetailsActionTypes.FETCH_COLLECTION_DETAILS_SUCCESS,
                payload: collectionDetails
            })
        } catch (e) {
            dispatch({
                type: CollectionDetailsActionTypes.FETCH_COLLECTION_DETAILS_ERROR,
                payload: "Ошибка при получении деталей коллекции с сервера"
            })
        }
    }
}

export function setCurrentCollectionDetails(id: string | undefined): CollectionDetailsAction {
    return { type: CollectionDetailsActionTypes.SET_CURRENT_COLLECTION_DETAILS, payload: id }
}