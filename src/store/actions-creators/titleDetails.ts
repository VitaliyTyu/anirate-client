import {Client} from "../../api/api";
import {Dispatch} from "redux";
import {TitleDetailsAction, TitleDetailsActionTypes} from "../../types/titleDetails";

const apiClient = new Client('https://localhost:5001');

export const getTitleDetails = () => {
    return async (dispatch: Dispatch<TitleDetailsAction>) => {
        try {
            dispatch({
                type: TitleDetailsActionTypes.FETCH_TITLE_DETAILS
            })

            const titleDetails = await apiClient.animeTitleDetails("24617079-72ee-4f6e-8390-02cc2e97afb7");

            dispatch({
                type: TitleDetailsActionTypes.FETCH_TITLE_DETAILS_SUCCESS,
                payload: titleDetails
            })
        } catch (e) {
            dispatch({
                type: TitleDetailsActionTypes.FETCH_TITLE_DETAILS_ERROR,
                payload: "Ошибка при получении деталей аниме тайтла с сервера"
            })
        }
    }
}