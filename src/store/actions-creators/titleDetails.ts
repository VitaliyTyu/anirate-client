import {Client} from "../../api/api";
import {Dispatch} from "redux";
import {TitleDetailsAction, TitleDetailsActionTypes} from "../../types/titleDetails";
import {TitlesAction, TitlesActionTypes} from "../../types/titles";

const apiClient = new Client('https://localhost:5001');

export const getTitleDetails = (id: string | undefined) => {
    return async (dispatch: Dispatch<TitleDetailsAction>) => {
        try {
            dispatch({
                type: TitleDetailsActionTypes.FETCH_TITLE_DETAILS
            })

            if (id === undefined) {
                throw "id was undefined"
            }

            const titleDetails = await apiClient.animeTitleDetails(id);

            dispatch({
                type: TitleDetailsActionTypes.FETCH_TITLE_DETAILS_SUCCESS,
                payload: titleDetails
            })
        } catch (e) {
            console.log(e)
            dispatch({
                type: TitleDetailsActionTypes.FETCH_TITLE_DETAILS_ERROR,
                payload: "Ошибка при получении деталей аниме тайтла с сервера"
            })
        }
    }
}

export function setCurrentTitleDetails(id: string | undefined): TitleDetailsAction {
    return {type: TitleDetailsActionTypes.SET_CURRENT_TITLE_DETAILS, payload: id}
}