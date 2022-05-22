import { ApiException, Client } from "../../api/api";
import { TitlesAction, TitlesActionTypes } from "../../types/titles";
import { Dispatch } from "redux";
import { CollectionsAction, CollectionsActionTypes } from "../../types/collections";

const apiClient = new Client('https://localhost:5001');

export const getCollections = (page: number = 1, size: number = 10) => {
    return async (dispatch: Dispatch<CollectionsAction>) => {
        try {

            dispatch({
                type: CollectionsActionTypes.FETCH_COLLECTIONS
            })

            const paginatedList = await apiClient.animeCollections(page, size);

            dispatch({
                type: CollectionsActionTypes.FETCH_COLLECTIONS_SUCCESS,
                payload: paginatedList
            })

        } catch (e) {
            var error = e as ApiException;

            dispatch({
                type: CollectionsActionTypes.FETCH_COLLECTIONS_ERROR,
                payload: error
            })

        }
    }
}

export function setCollectionsPage(page: number = 1): CollectionsAction {
    return { type: CollectionsActionTypes.SET_COLLECTIONS_PAGE, payload: page }
}