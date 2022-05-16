import { Client } from "../../api/api";
import { TitlesAction, TitlesActionTypes } from "../../types/titles";
import { Dispatch } from "redux";

const apiClient = new Client('https://localhost:5001');

export const getTitles = (page: number = 1, size: number = 10) => {
    return async (dispatch: Dispatch<TitlesAction>) => {
        try {
            dispatch({ type: TitlesActionTypes.FETCH_TITLES })
            const paginatedList = await apiClient.animeTitles(page, size);
            dispatch({
                type: TitlesActionTypes.FETCH_TITLES_SUCCESS,
                payload: paginatedList
            })
        } catch (e) {
            dispatch({
                type: TitlesActionTypes.FETCH_TITLES_ERROR,
                payload: "Ошибка при получении аниме тайтлов с сервера"
            })
        }
    }
}

export function setTitlesPage(page: number): TitlesAction {
    return { type: TitlesActionTypes.SET_TITLES_PAGE, payload: page }
}