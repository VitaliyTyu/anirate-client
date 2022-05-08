import {TitleDetailsVM} from "../../api/api";
import {TitleDetailsAction, TitleDetailsActionTypes, TitleDetailsState} from "../../types/titleDetails";

const initialState: TitleDetailsState = {
    titleDetails: undefined,
    loading: false,
    error: null,
    currentId: undefined,
}

export const titleDetailsReducer = (state= initialState, action: TitleDetailsAction): TitleDetailsState => {
    switch (action.type) {
        case TitleDetailsActionTypes.FETCH_TITLE_DETAILS:
            return {...state, loading: true}
        case TitleDetailsActionTypes.FETCH_TITLE_DETAILS_SUCCESS:
            return {...state, loading: false, titleDetails: action.payload}
        case TitleDetailsActionTypes.FETCH_TITLE_DETAILS_ERROR:
            return {...state, loading: false, error: action.payload}
        case TitleDetailsActionTypes.SET_CURRENT_TITLE_DETAILS:
            return {...state, loading: false, currentId: action.payload}
        default:
            return state
    }
}