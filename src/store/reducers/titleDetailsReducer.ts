import {TitleDetailsVM} from "../../api/api";
import {TitleDetailsAction, TitleDetailsActionTypes, TitleDetailsState} from "../../types/titleDetails";

const initialState: TitleDetailsState = {
    titleDetails: null,
    loading: false,
    error: null,
}

export const titleDetailsReducer = (state= initialState, action: TitleDetailsAction): TitleDetailsState => {
    switch (action.type) {
        case TitleDetailsActionTypes.FETCH_TITLE_DETAILS:
            return {loading: true, error: null, titleDetails: null}
        case TitleDetailsActionTypes.FETCH_TITLE_DETAILS_SUCCESS:
            return {loading: false, error: null, titleDetails: action.payload}
        case TitleDetailsActionTypes.FETCH_TITLE_DETAILS_ERROR:
            return {loading: false, error: action.payload, titleDetails: null}
        default:
            return state
    }
}