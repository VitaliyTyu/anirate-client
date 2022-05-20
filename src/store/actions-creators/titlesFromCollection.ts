import { Client } from "../../api/api";
import { Dispatch } from "redux";
import { TitlesFromCollectionAction, TitlesFromCollectionActionTypes } from "../../types/titlesFromCollection";

const apiClient = new Client('https://localhost:5001');

export const getTitlesFromCollection = (collectonId: string | undefined, page: number = 1, size: number = 10) => {
    return async (dispatch: Dispatch<TitlesFromCollectionAction>) => {
        try {
            dispatch({ type: TitlesFromCollectionActionTypes.FETCH_TITLES_FROM_COLLECTION })

            if (collectonId === undefined) {
                throw "id was undefined"
            }

            const paginatedList = await apiClient.titlesFromCollection(collectonId, page, size);

            dispatch({
                type: TitlesFromCollectionActionTypes.FETCH_TITLES_FROM_COLLECTION_SUCCESS,
                payload: paginatedList
            })
        } catch (e) {
            dispatch({
                type: TitlesFromCollectionActionTypes.FETCH_TITLES_FROM_COLLECTION_ERROR,
                payload: "Ошибка при получении аниме тайтлов с сервера"
            })
        }
    }
}

export function setTitlesFromCollectionPage(page: number): TitlesFromCollectionAction {
    return { type: TitlesFromCollectionActionTypes.SET_TITLES_FROM_COLLECTION_PAGE, payload: page }
}